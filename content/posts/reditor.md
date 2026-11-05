---
title: 'Reditor: edit files from your server in the browser'
slug: reditor
tags:
  - CLI
  - DevOps
  - TypeScript
excerpt: SSH into a box, fight vim, save a YAML. Or serve the file on the box, tunnel from your laptop, and edit it in the browser.
order: 8
---

SSH into a box. Fight vim. Save a YAML file. Or serve the file on the box, tunnel from your laptop, and edit it in the browser.

That's **Reditor** — a small CLI that starts a localhost editor on the server. From your laptop you open an SSH tunnel and edit in a real browser, with syntax highlighting and ⌘S / Ctrl+S. No clone. No IDE. No OTP unless you ask for it.

<figure class="post-figure"><img src="/posts/reditor/editor.png" alt="Reditor in the browser, editing nginx.conf with syntax highlighting, a Save button, and a status bar"><figcaption>The editor at localhost:8080 — syntax highlighting, save, session history.</figcaption></figure>

---

### Why

Editing a config on a remote machine should not mean wrestling a shell editor over SSH. I wanted something I could drop on a box, aimed at DevOps engineers and anyone who needs to change a file without cloning a repo or installing an editor remotely.

SSH is the lock. Keep `serve` bound to localhost. The tunnel is the way in.

---

### Quick start

Requires Node.js 18 or newer. Recommended: tunnel from your laptop so the editor stays on localhost on the server.

```bash
# On the server
npx reditor serve /etc/nginx/nginx.conf

# On your laptop — leave this running
npx reditor tunnel user@that-server --port=8080
```

The editor opens at `http://localhost:8080` when the tunnel is up. Edit. Hit **⌘S** / **Ctrl+S**.

The tunnel stays up if you stop and restart `serve`. Switch files on the server without resetting SSH.

Same machine, no SSH:

```bash
npx reditor serve ./config.yaml
# then open http://localhost:3000
```

Not on npm yet? Run it straight from GitHub:

```bash
npx github:arielpchara/reditor-v2 serve ./config.yaml
npx github:arielpchara/reditor-v2 tunnel user@that-server --port=8080
```

---

### What you get

-   **Browser editor** — syntax highlighting from the file extension (`yaml`, `json`, `nginx.conf`, and more)
-   **Save from the browser** — one click or ⌘S / Ctrl+S; the button stays off until the file is dirty
-   **Session history** — restore earlier saves from this run without leaving the page
-   **Status bar** — serve state, tunnel, directory, host, and port
-   **Fail-fast validation** — refuses directories, binary files, and anything over 512 KB
-   **Zero install** — `npx reditor serve <file>` / `npx reditor tunnel <target>`

---

### Security

OTP is off by default. Access is SSH: keep `serve` on localhost and `tunnel` from your laptop.

Pass `--enable-security` if you bind `serve` without a tunnel. That prints a 6-digit OTP, exchanges it for an RS256 JWT, and exits the process after three bad attempts. TLS is separate — HTTP is the default; pass `--https` if you want it.

> SSH is the lock. OTP is opt-in. Don't expose the editor on 0.0.0.0 unless you know why.

---

### Try it

Source: [github.com/arielpchara/reditor-v2](https://github.com/arielpchara/reditor-v2)

There is a Docker demo in the repo if you want to try the tunnel path without a remote box. `serve` binds 127.0.0.1 inside the container — HTTP is not published. The only way in is SSH, then `reditor tunnel`.

The rebuild story — architecture first, AI as copilot, under 24 hours — is in [I rebuilt a project from scratch in under 24 hours](/ai-as-copilot-reditor/). This post is the product. That one is the process.

---

<p class="post-closing">Serve on the box. Tunnel from the laptop. Edit in the browser.</p>
