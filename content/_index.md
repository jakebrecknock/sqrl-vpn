---
title: SQrL
description: The story of building the SQrL VPN
---

{{< blocks/cover height="full" color="dark sqrl-hero" >}}

<span class="sqrl-eyebrow"><span class="dot"></span>The build log</span>

<h1 class="sqrl-title">SQrL</h1>

<!-- The line under the title. Edit freely. -->
<p class="sqrl-tagline">The story of building the SQrL VPN: what we made, how it works, and the competencies behind it.</p>

<div class="td-cta-buttons mt-5">
  <a class="btn btn-lg btn-sqrl-light me-2 mb-3" href="competencies/">
    View competencies <i class="fas fa-arrow-right ms-2"></i>
  </a>
  <a class="btn btn-lg btn-sqrl-ghost mb-3" href="tech/">
    Explore the tech
  </a>
</div>

<a class="sqrl-scroll" href="#explore">Explore<i class="fas fa-chevron-down"></i></a>

{{< /blocks/cover >}}


<!-- Wayfinding cards, right under the title. "What is SQrL?" scrolls down this
     page; the other two open their own pages. -->
{{% blocks/section color="dark sqrl-explore" %}}
<h2 class="sqrl-section-title" id="explore">Inside the project</h2>

<!-- Edit the text between <p> and </p> in each card below. -->
<div class="sqrl-cards">
  <a class="sqrl-card" href="#what-is-sqrl">
    <div class="sqrl-card__icon"><i class="fas fa-network-wired"></i></div>
    <h3>What is SQrL?</h3>
    <p>A WireGuard VPN with safe one-click defaults, live speed ratings for every city, and power features for the people who want them.</p>
    <span class="sqrl-card__link sqrl-card__link--down">How it works ↓</span>
  </a>
  <a class="sqrl-card" href="tech/">
    <div class="sqrl-card__icon"><i class="fas fa-microchip"></i></div>
    <h3>The Tech</h3>
    <p>A Kotlin app, a Go backend, a SQLite database and WireGuard tunnels, with tests running on every push.</p>
    <span class="sqrl-card__link">Explore the tech →</span>
  </a>
  <a class="sqrl-card" href="competencies/">
    <div class="sqrl-card__icon"><i class="fas fa-list-check"></i></div>
    <h3>Competencies</h3>
    <p>Placeholder: a one-line intro to the competencies.</p>
    <span class="sqrl-card__link">View competencies →</span>
  </a>
</div>
{{% /blocks/section %}}


{{% blocks/section color="light" %}}
<div class="sqrl-about">

<p class="sqrl-kicker">Who we are</p>

## About Us {#about-us .sqrl-section-title}

<!-- ============================================================
     WRITE YOUR "ABOUT US" SECTION HERE.
     Replace the placeholder paragraph below with your own text.
     Regular Markdown works: **bold**, _italics_, [links](https://...), lists.
     ============================================================ -->

_This VPN was a part of a Grinnell College CSC course (CSC-324). The actual product has been coded by three of the student in said class: Alex Cyphers, Jake Brecknock, and Leo Goldman. All three of us are computer science majors at Grinnell with specialties in unique fields. I was in charge of the data base, Alex handled the UI, and Leo was the primary backend Go developer. Feel free to check out some more of my work or reach out via my [personal site](https://jakebrecknock.com)_

</div>
{{% /blocks/section %}}


{{% blocks/section color="white" %}}
<div class="sqrl-what" id="what-is-sqrl">
<div class="sqrl-what__intro">
<p class="sqrl-kicker">What is SQrL?</p>
<h2 class="sqrl-section-title">A VPN that’s simple by default and powerful when you need it</h2>
<p class="sqrl-lede">SQrL is a VPN built by three Grinnell College computer science students for CSC-324. It sends your internet traffic through an encrypted WireGuard tunnel to one of our servers, so the sites you visit see the server’s location instead of yours, and the network you’re on, like café or dorm Wi-Fi, can’t read what you’re doing.</p>
<p>We started by interviewing people who already use VPNs. We kept hearing the same complaints: streaming sites block well-known VPN servers, the apps are confusing the first time you open them, the useful features sit behind a paywall, and some, like port forwarding for torrenting, are missing entirely. SQrL is our answer to those complaints.</p>
</div>

{{< server-map >}}

<div class="sqrl-features">
  <div class="sqrl-feature">
    <div class="sqrl-feature__icon"><i class="fas fa-power-off"></i></div>
    <h3>One click, safe defaults</h3>
    <p>Every privacy protection is on out of the box: the kill switch, DNS leak protection and IPv6 leak protection. Anything that could break your connection stays off until you turn it on.</p>
  </div>
  <div class="sqrl-feature">
    <div class="sqrl-feature__icon"><i class="fas fa-gauge-high"></i></div>
    <h3>Speed you can read</h3>
    <p>Instead of raw milliseconds, each city is rated fastest, fast, slow or slowest, based on live server data that is never more than 30 seconds old.</p>
  </div>
  <div class="sqrl-feature">
    <div class="sqrl-feature__icon"><i class="fas fa-sliders"></i></div>
    <h3>Power features built in</h3>
    <p>Port forwarding, split tunneling and DNS filtering for ads, trackers and malware are all there, tucked into an advanced section so they never get in a beginner’s way.</p>
  </div>
  <div class="sqrl-feature">
    <div class="sqrl-feature__icon"><i class="fas fa-user-shield"></i></div>
    <h3>Private by design</h3>
    <p>There is no table for browsing history. Connection details are wiped when you disconnect, passwords are hashed with Argon2id, and server keys are only ever stored encrypted.</p>
  </div>
</div>

<div class="sqrl-stats">
  <div class="sqrl-stat"><span class="sqrl-stat__num" data-count="9">9</span><span class="sqrl-stat__label">server locations</span></div>
  <div class="sqrl-stat"><span class="sqrl-stat__num" data-count="35">35</span><span class="sqrl-stat__label">database tests on every push</span></div>
  <div class="sqrl-stat"><span class="sqrl-stat__num" data-count="30" data-suffix=" s">30 s</span><span class="sqrl-stat__label">max age of live speed data</span></div>
  <div class="sqrl-stat"><span class="sqrl-stat__num">0</span><span class="sqrl-stat__label">browsing logs kept</span></div>
</div>
</div>
{{% /blocks/section %}}


{{% blocks/section color="light" %}}
<p class="sqrl-kicker">Portfolio</p>
<h2 class="sqrl-section-title">Competencies</h2>

{{< competency-cards >}}
{{% /blocks/section %}}
