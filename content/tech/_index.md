---
title: Tech
description: How SQrL works under the hood.
cascade:
  type: docs
weight: 20
---

<!-- ============================================================
     The Tech page. Each "## Heading" shows up in the "On this page"
     list on the right. Want more than one Tech page? Add files like
     content/tech/architecture.md (with a title in the front matter) and
     they'll appear in the left sidebar.
     ============================================================ -->

## Overview

SQrL has four main parts: a **Kotlin client app**, a **Go backend**, a
**SQLite database** and a network of **WireGuard VPN servers**.

The app talks to the backend to sign in, register your device and pick a
server. Your actual browsing never passes through the backend: once you
connect, traffic goes straight from your device to a VPN server through an
encrypted WireGuard tunnel, and out to the internet from there.

{{< architecture >}}

## The components

{{< tabpane text=true right=false >}}
{{% tab header="**App** · Kotlin" lang="app" %}}

The client is written in **Kotlin** and is built around one big Connect
button. Everything else supports that one action:

- **A map of server locations**, each rated *fastest*, *fast*, *slow* or
  *slowest* instead of showing raw milliseconds.
- **Connect to fastest** by default, or pick a specific city.
- **Settings with safe defaults:** kill switch (with local network access
  still allowed), DNS and IPv6 leak protection, and auto-connect on
  untrusted Wi-Fi are all on from the start.
- **An advanced section** for port forwarding, split tunneling and DNS
  filtering, all off until you want them.
- **Your look:** light, dark or system theme, plus an accent color.

The app creates the device’s WireGuard keys on the device itself, and only the
public key is ever sent to us. We’re working toward shipping SQrL as a full,
installable app.

{{% /tab %}}
{{% tab header="**Backend** · Go" lang="backend" %}}

The backend is written in **Go** and sits between the app and the database.
Its job:

- **Accounts and sign-in.** Passwords are hashed with Argon2id, and session
  tokens are stored only as SHA-256 hashes.
- **Devices.** Each account can register up to five devices, each with its
  own WireGuard public key and tunnel address.
- **Choosing a server.** It finds the fastest healthy server overall or in the
  city you picked, and hands the app what it needs to connect.
- **Watching the servers.** A monitor checks every server every 5–10 seconds
  and records its latency, load and number of connected peers.
- **Protecting keys.** Server private keys are encrypted before they are
  stored, using a master key that lives outside the database.
- **Keeping users apart.** Every request that touches user data is limited to
  the signed-in user.

{{% /tab %}}
{{% tab header="**Database** · SQLite" lang="database" %}}

The database is **SQLite**: a single file, no separate server to run, and easy
to test.

- **10 tables** split into a user side (users, devices, settings, port
  forwards, sign-in tokens) and a server side (locations, servers, encrypted
  keys, live stats, stats history).
- **4 views** act as a simple read API. For example, `location_status` gives
  the map every city’s speed rating in one query.
- **Rules live in the database itself**, so bad data is refused even if other
  code has a bug: no plaintext passwords, no sixth device, no connecting to a
  server that isn’t active.
- **WAL mode** lets the app keep reading while the monitor writes live stats.
- **Versioned migrations** mean the schema can grow without breaking
  existing data.

{{% /tab %}}
{{% tab header="**Tunnel** · WireGuard" lang="tunnel" %}}

The tunnel uses **WireGuard**, a modern VPN protocol known for its speed and
its small, readable codebase.

- Each device and each server has its own key pair. The server knows a device
  only by its **public key**.
- Traffic is encrypted with **ChaCha20-Poly1305**, and keys are exchanged with
  **Curve25519**.
- Servers listen on **UDP port 51820**.
- A **25-second keepalive** keeps the connection open when a device sits behind
  a home router or other NAT.

{{% /tab %}}
{{< /tabpane >}}

## How live speeds work

1. **Measure.** The backend’s monitor checks each server every 5–10 seconds.
2. **Record.** It writes one row per server with the latest latency, load and
   peer count.
3. **Rate.** A database view takes the best latency in each city and turns it
   into a tier: up to 25 ms is *fastest*, up to 60 ms *fast*, up to 120 ms
   *slow*, and anything above that *slowest*.
4. **Show.** The app reads those ratings and colors the map.

If a server’s numbers are more than **30 seconds old**, it is treated as
unavailable. A crashed monitor can’t make a dead server look like the fastest
one.

## Privacy and security

- **No browsing log.** There is nowhere in the database to store the sites you
  visit.
- **Connection state is current-only.** When you disconnect, the record of
  where you were connected is wiped.
- **Your private key never leaves your device.**
- **Passwords and tokens are hashed**, and the database rejects anything that
  looks like a plaintext password.
- **Server keys are encrypted at rest**, and the master key is kept out of the
  database and out of git.

## Testing and automation

- **35 database tests** check the schema’s rules, its views and the live-stats
  pipeline. They run in under a second with nothing to install.
- **GitHub Actions** runs the tests on every push and builds a full
  development database from scratch.
- **Command-line tools** set up a database, simulate live server stats and
  check the database’s integrity in one command each.

## Tech stack

| Layer | Technology | What it’s good at |
|---|---|---|
| App | Kotlin | Modern, safe language for building apps |
| Backend | Go | Fast, simple concurrency for the API and server monitor |
| Database | SQLite | Zero setup, a single file, quick to test |
| VPN tunnel | WireGuard | Fast, modern, small codebase |
| CI | GitHub Actions | Runs the tests on every push |
| This site | Hugo + Docsy on GitHub Pages | Fast static pages, free hosting |
