// Builds casebook/index.json from the Markdown posts in casebook/posts.
// Run by the GitHub Actions workflow on a copy of the site: node scripts/build-casebook.mjs _site
// Drafts are left out of the list AND deleted from the published copy.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const root = process.argv[2] || '.';
const postsDir = path.join(root, 'casebook', 'posts');
const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const VIDEO = /^[A-Za-z0-9_-]{6,20}$/;
const entries = [];
let drafts = 0;

const toDate = (v) => {
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
  const m = String(v ?? '').match(/^\d{4}-\d{2}-\d{2}/);
  return m ? m[0] : '';
};
const text = (v) => (v == null ? '' : String(v).trim());

for (const file of fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : []) {
  if (!file.endsWith('.md')) continue;
  const full = path.join(postsDir, file);
  const slug = file.slice(0, -3);
  const raw = fs.readFileSync(full, 'utf8').replace(/^﻿/, '');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) { console.warn(`skip ${file}: no front matter`); continue; }
  let meta;
  try { meta = yaml.load(m[1]) || {}; } catch (e) { console.warn(`skip ${file}: ${e.message}`); continue; }
  if (!SLUG.test(slug)) { console.warn(`skip ${file}: file name must be lowercase letters, numbers and dashes`); continue; }
  if (meta.draft === true || String(meta.draft).toLowerCase() === 'true') {
    fs.rmSync(full); drafts++; continue;
  }
  entries.push({
    slug,
    kind: meta.kind === 'customer' ? 'customer' : 'lab',
    title: text(meta.title) || slug,
    date: toDate(meta.date),
    problem: text(meta.problem),
    solution: text(meta.solution),
    tags: Array.isArray(meta.tags) ? meta.tags.map(text).filter(Boolean) : [],
    video: VIDEO.test(text(meta.video)) ? text(meta.video) : '',
    hasBody: m[2].trim().length > 0,
  });
}

entries.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title));
fs.mkdirSync(path.join(root, 'casebook'), { recursive: true });
fs.writeFileSync(path.join(root, 'casebook', 'index.json'), JSON.stringify(entries, null, 2) + '\n');
console.log(`casebook: ${entries.length} published, ${drafts} draft(s) left out`);
