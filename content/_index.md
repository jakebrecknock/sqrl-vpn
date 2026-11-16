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

<a class="sqrl-scroll" href="#about-us">About us<i class="fas fa-chevron-down"></i></a>

{{< /blocks/cover >}}


{{% blocks/section color="white" %}}
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


{{% blocks/section color="dark" %}}
<p class="sqrl-kicker">Explore</p>
<h2 class="sqrl-section-title">Inside the project</h2>

<!-- Edit the text between <p> and </p> in each card below. -->
<div class="sqrl-cards">
  <a class="sqrl-card" href="tech/">
    <div class="sqrl-card__icon"><i class="fas fa-network-wired"></i></div>
    <h3>What is SQrL?</h3>
    <p>Placeholder: a one-line description of SQrL.</p>
    <span class="sqrl-card__link">How it works →</span>
  </a>
  <a class="sqrl-card" href="tech/">
    <div class="sqrl-card__icon"><i class="fas fa-microchip"></i></div>
    <h3>The Tech</h3>
    <p>Placeholder: the stack and architecture at a glance.</p>
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
<p class="sqrl-kicker">Portfolio</p>
<h2 class="sqrl-section-title">Competencies</h2>

{{< competency-cards >}}
{{% /blocks/section %}}
