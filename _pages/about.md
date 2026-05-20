---
layout: about
title: about
permalink: /
description: <a href="https://www.tilburguniversity.edu/about/schools/tshd/departments/dca/meet-our-staff">Tilburg University</a> &middot; <a href="https://research.tue.nl/en/organisations/jads-den-bosch-tue">JADS Research</a> &middot; <a href="https://www.tue.nl/en/">TU/e</a>
tagline: Diffusion dynamics, information-guided training, and controllable generative models.
profile:
  align: right
  image: prof_pic.jpg
  address: >
    <p>The Netherlands</p>

news: true  # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

 

<div class="research-lead">
  <p align="justify">
    <strong>Where noise becomes structure.</strong>
    My research studies the regimes in diffusion models where uncertainty is
    resolved and structure becomes recoverable. These regimes are not uniform
    along the denoising trajectory. They shape diversity, memorization, guidance,
    and where training effort is useful. I develop this view through work on
    symmetry breaking in diffusion dynamics, information-guided noise allocation,
    and time-dependent guidance, aiming to make diffusion models less dependent
    on heuristic choices in training and control.
  </p>
</div>

<p align="justify">
I am a final-year Ph.D. researcher in Machine Learning at Tilburg University and JADS (TU/e), and a visiting researcher at the <a href="https://www.ru.nl/donders/">Donders Institute for Brain, Cognition and Behaviour</a> under the guidance of <a href="https://www.artcogsys.com/team/luca">Dr. Luca Ambrogioni</a> and <a href="https://ericpostma.nl/">Prof. Dr. Eric Postma</a>.
My research combines probabilistic generative modeling, statistical physics, and information theory to study the dynamics of diffusion models. I previously worked as a Research Scientist Intern on Sony AI's Foundational Models team in Tokyo, where I brought this research direction into applied work on generative-model training.
</p>

<div class="research-focus-grid">
  <div class="focus-card">
    <h3>Structure formation</h3>
    <p>How diffusion trajectories move from noise to data through phases, attractors, stability changes, and symmetry breaking.</p>
  </div>
  <div class="focus-card">
    <h3>Information-guided training</h3>
    <p>Where uncertainty is resolved along the corruption path, which noise levels carry learning signal, and how schedules should allocate effort.</p>
  </div>
  <div class="focus-card">
    <h3>Generalization dynamics</h3>
    <p>How generative behavior emerges from data geometry, associative memory, and the transition from memorization to structured synthesis.</p>
  </div>
  <div class="focus-card">
    <h3>Control and robustness</h3>
    <p>How guidance, negative conditioning, efficient sampling, and diffusion-based correction behave under distribution shift.</p>
  </div>
</div>

<section class="research-program">
  <div class="section-kicker">Selected research</div>
  <div class="program-grid">
    <a class="program-card program-card-fit-image" href="{{ '/blog/2023/symmetry-breaking-diffusion-models/' | relative_url }}">
      <img src="{{ '/assets/img/ssdm/selected_research_thumbnail.png' | relative_url }}" alt="Symmetry breaking dynamics in diffusion models">
      <div>
        <span>NeurIPS</span>
        <h3>Symmetry breaking in diffusion dynamics</h3>
        <p>Diffusion generation passes through distinct dynamical regimes: early trajectories collapse toward a central fixed point, while later dynamics break symmetry and move toward data-manifold attractors.</p>
      </div>
    </a>
    <a class="program-card program-card-fit-image" href="https://arxiv.org/abs/2602.18647">
      <img src="{{ '/assets/img/infonoise/selected_research_thumbnail.png' | relative_url }}" alt="Noise scheduling information profile and resolution window">
      <div>
        <span>arXiv</span>
        <h3>Noise scheduling as information-guided allocation</h3>
        <p>Noise schedules allocate training effort before the distribution of denoising difficulty is known. We estimate where uncertainty is resolved and adapt training toward that profile.</p>
      </div>
    </a>
    <a class="program-card program-card-fit-image" href="{{ '/blog/2025/memorization-generalization/' | relative_url }}">
      <img src="{{ '/assets/img/memorization_generalization/selected_research_thumbnail.png' | relative_url }}" alt="Energy transition from memorization to generalization">
      <div>
        <span>arXiv</span>
        <h3>From memorization to generalization</h3>
        <p>Generative behavior can be analyzed through associative memory: models move from storing examples to organizing them into structured, generalizing dynamics.</p>
      </div>
    </a>
    <a class="program-card program-card-fit-image" href="https://arxiv.org/pdf/2410.14398">
      <img src="{{ '/assets/img/negative_guidance/selected_research_thumbnail.png' | relative_url }}" alt="Dynamic negative guidance over diffusion time">
      <div>
        <span>ICLR</span>
        <h3>Dynamic negative guidance</h3>
        <p>Negative prompting can fail when the reverse process is non-stationary. Dynamic Negative Guidance modulates guidance across time and state to remove unwanted content more accurately.</p>
      </div>
    </a>
  </div>
</section>

<p align="justify">
Before my Ph.D., I obtained an M.Sc. in Computer Science at <a href="https://www.ru.nl/english/">Radboud University</a>, where I worked on unsupervised out-of-distribution detection for digital pathology with <a href="https://www.twanvl.nl/">Twan van Laarhoven</a> and <a href="https://www.computationalpathologygroup.eu/members/jasper-linmans/">Jasper Linmans</a>. I was also a visiting researcher at the <a href="https://www.computationalpathologygroup.eu/">Computational Pathology Group</a>, Radboud UMC, working on unsupervised and representation learning for histopathology with <a href="https://www.computationalpathologygroup.eu/members/witali-aswolinskiy/">Witali Aswolinskiy</a> and <a href="https://www.computationalpathologygroup.eu/members/francesco-ciompi/">Francesco Ciompi</a>.
</p>
