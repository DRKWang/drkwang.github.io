---
layout: default2
title: Home
---

<header class="profile">
  <div>
    <h1>Binshuai Wang</h1>
    <p><strong>Ph.D. Candidate in Computer Science</strong></p>
    <p>The George Washington University</p>
    <p>
      I work on optimal transport theory, neural network optimization, machine learning, and hashing methods.
    </p>
  </div>

  <img src="{{ '/assets/imgs/profile.png' | relative_url }}" alt="Binshuai Wang">
</header>

<section id="about">
  <h2>About</h2>
  <p>
    I am a Ph.D. candidate in Computer Science at The George Washington University.
    I received my M.S. in Computer Science from UC Davis and my B.S. in Mathematics
    from the Hua Loo-Keng Honors Class at Beihang University.
  </p>
  <p>
    My research lies at the intersection of mathematics and computer sciences, with a focus on
    optimal transport theory and neural network optimization. 
    My recent work studies Relative Wasserstein geometry, which extends concepts such as angles, inner products, and orthogonal projections to spaces of probability distributions.
  </p>
</section>

<section id="research">
  <h2>Research Interests</h2>
  <ul>
    <li>Optimal transport theory</li>
    <li>Neural network optimization</li>
    <li>Machine learning</li>
    <li>Hashing methods</li>
  </ul>
</section>

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
  <p>Email: <a href="mailto:binshuaiw@gmail.com">binshuaiw@gmail.com</a></p>
  <p>GitHub: <a href="https://github.com/drkwang">DRKWang</a></p>
  <p>LinkedIn: <a href="https://www.linkedin.com/in/binshuai-wang-0855151a3/">Binshuai Wang</a></p>
</section>