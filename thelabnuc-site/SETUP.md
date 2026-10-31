# Casebook editor: one-time setup

## 1. Put the files in your site repository
Copy everything in this folder into the root of your GitHub Pages repository, replacing `index.html` and
`contact.html`. Keep your existing `homelab.jpg` (and your `CNAME`, if you have one). The new items are:

- `admin/` the editor (opens at https://thelabnuc.com/admin/)
- `casebook/` posts (`posts/`), pictures (`images/`) and the page's markdown libraries (`vendor/`)
- `scripts/` and `.github/workflows/pages.yml` the step that builds the Casebook list when you publish
- `.nojekyll`

Open `admin/config.yml` and change this line to your repository:

    repo: YOUR-GITHUB-USER/YOUR-REPO

## 2. Switch GitHub Pages to "GitHub Actions"
Repository → Settings → Pages → **Build and deployment → Source: GitHub Actions**.
Check that your custom domain (thelabnuc.com) is still shown on that page. Push the files; the "Publish site"
run under the Actions tab should turn green.

## 3. Create your editor token (this is the login)
GitHub → your profile picture → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**
→ Generate new token.
- Repository access: **Only select repositories** → pick this one repository.
- Permissions → Repository permissions → **Contents: Read and write** (Metadata read is added automatically).
- Choose an expiry you are comfortable renewing, then copy the token.

## 4. Sign in and write
Open https://thelabnuc.com/admin/ → **Sign In Using Access Token** → paste the token.
Choose **Casebook → New Entry**, fill in the fields and write the write-up.

- Screenshots: paste or drag them into the write-up, or use the image button. They are saved to `casebook/images/`.
- Keep each screenshot under about 1 MB (crop to what matters).
- **Draft** is on by default. Turn it off and save to publish. Drafts are not put on the website.
- A new entry appears on thelabnuc.com about a minute after you save (watch the Actions tab).
- To add a video, paste only the YouTube ID (the part after `v=`).

## Good to know
- Only people who can write to your repository can change anything. Visitors can only read.
- The token is kept in your browser. Use it only on your own devices and revoke it on GitHub if a device is lost.
- Drafts are hidden from the website but still saved in the repository. If the repository is public, anyone
  can read them on GitHub. Do not put customer names, IP addresses or private details in a draft or a screenshot.
- If an entry does not show up: check the Actions tab for a red run, and make sure the file name in
  `casebook/posts/` uses only lowercase letters, numbers and dashes.
