---
layout: default2
title: Home
---

<header class="profile">
  <div>
    <h1>About</h1>
    <p>
      Welcome! I am a Ph.D. candidate in Computer Science at
      The George Washington University.
      I obtained an M.S. in Computer Science from UC Davis and
      a B.S. in Mathematics from the Hua Loo-Keng (华罗庚)
      Honors Class at Beihang University.
      My research focuses on optimal transport theory,
      parameter-efficient neural networks, and machine learning
      models, including Vision Transformers and diffusion models.
    </p>
      <!-- <p>
    My research lies at the intersection of mathematics, optimization, and computer science, with a focus on the optimal transport, parameter-efficient neural networks, and machine learning models.)
        My recent work studies Relative Wasserstein geometry, which extends concepts such as angles, inner products, and orthogonal projections to spaces of probability distributions.
      </p> -->
  </div>

<img src="{{ '/assets/imgs/profile.png' | relative_url }}"
         alt="Binshuai Wang"
         style="width: 170px; height: auto;">
</header>

<!-- 
<section id="about">

</section> -->

<!-- <section id="research">
  <h2>Research Interests</h2>
  <ul>
    <li>Optimal transport theory</li>
    <li>Neural network optimization</li>
    <li>Machine learning</li>
    <li>Hashing methods</li>
  </ul>
</section> -->

<section id="publications">
  <h2>Selected Publications</h2>
  <ol id="publication-list"></ol>
  <p><a href="{{ '/publications/' | relative_url }}">View all publications →</a></p>
</section>

<script>
  window.publicationsBibPath = "{{ '/publications.bib' | relative_url }}";
</script>
<script src="{{ '/assets/js/publications.js' | relative_url }}"></script>
<script>
  loadPublications(true);
</script>

<section id="contact">
  <h2>Contact</h2>
  <p> By Email: 
        <a href="mailto:derekwang@gwu.com">binshuaiw@gmail.com</a></p>
  <!--<p>GitHub: <a href="https://github.com/drkwang">DRKWang</a></p> -->
<p>By LinkedIn: <a href="https://www.linkedin.com/in/binshuai-wang-0855151a3/">Binshuai Wang</a></p>
</section>
 