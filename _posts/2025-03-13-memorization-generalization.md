---
layout: paper
title: "Memorization to Generalization: Emergence of Diffusion Models from Associative Memory"
title_line1: "Memorization to Generalization"
title_line2: "Emergence of Diffusion Models from Associative Memory"
date: 2025-03-12
tags: diffusion memorization generalization associative-memory energy-landscapes
authors:
  - name: Bao Pham
    url: "https://bhqpham.com/"
    affiliations:
      name: RPI
  - name: Gabriel Raya
    url: "https://gabrielraya.com/"
    affiliations:
      name: JADS Research
  - name: Matteo Negri
    affiliations:
      name: Sapienza University of Rome
  - name: Mohammed J. Zaki
    url: "https://www.cs.rpi.edu/~zaki/"
    affiliations:
      name: RPI
  - name: Luca Ambrogioni
    url: "https://www.ru.nl/en/people/ambrogioni-l"
    affiliations:
      name: Radboud University
  - name: Dmitry Krotov
    affiliations:
      name: MIT-IBM Watson AI Lab

arxiv: "https://arxiv.org/abs/2505.21777"
pdf:
  - location: "https://arxiv.org/pdf/2505.21777"

image:
  - location: "assets/img/memorization_generalization/energy_transition.png"
teaser_caption: "Figure 1. Increasing empirical support changes the attractor structure of the denoising energy. Isolated minima retrieve stored samples, interacting memories produce spurious states, and dense support gives a broader low-energy structure aligned with the data geometry."

toc:
  - name: The finite-data problem
  - name: Associative memory
  - name: The empirical denoising energy
  - name: Attractor regimes
  - name: Spurious states
  - name: Low-dimensional geometry
  - name: Image-space evidence
  - name: Statistical-physics interpretation
  - name: Citation

_styles: >
  .paper-teaser-stack {
    max-width: 980px !important;
  }
  .tutorial-lead {
    border-left: 4px solid #2f6fb3;
    margin: 1.2rem 0 1.6rem;
    padding: 0.1rem 0 0.1rem 1rem;
  }
  .tutorial-lead p {
    font-size: 1.04rem;
    line-height: 1.65;
  }
  .tutorial-callout {
    background: #f7f9fc;
    border: 1px solid #dbe5f3;
    border-left: 4px solid #2f6fb3;
    border-radius: 8px;
    margin: 1.1rem 0;
    padding: 0.9rem 1rem;
  }
  .tutorial-callout p {
    margin: 0;
  }
  .equation-box {
    background: #fbfbfb;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    margin: 1rem 0;
    padding: 0.85rem 1rem;
  }
  .phase-grid,
  .takeaway-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 1.2rem 0;
  }
  .phase-card,
  .takeaway-card {
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    background: #fff;
    padding: 0.85rem;
  }
  .phase-card h3,
  .takeaway-card h3 {
    font-size: 1rem;
    margin-top: 0;
  }
  .phase-card img {
    border-radius: 6px;
    margin-bottom: 0.6rem;
    width: 100%;
  }
  .figure-panel {
    margin: 1.3rem 0;
    text-align: center;
  }
  .figure-panel img {
    border-radius: 8px;
    max-width: 100%;
  }
  .figure-panel figcaption {
    color: #555;
    font-size: 0.9rem;
    line-height: 1.45;
    margin: 0.55rem auto 0;
    max-width: 920px;
    text-align: justify;
  }
  .comparison-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    margin: 1.2rem 0;
  }
  .comparison-grid figure {
    margin: 0;
  }
  .comparison-grid img {
    border-radius: 8px;
    width: 100%;
  }
  @media (max-width: 760px) {
    .phase-grid,
    .takeaway-grid,
    .comparison-grid {
      grid-template-columns: 1fr;
    }
  }
---

<div class="tutorial-lead">
  <p align="justify">
    Our paper studies diffusion models as associative memories. In the optimal
    empirical denoising problem, the finite training set induces an energy
    landscape with a memory-like retrieval structure. With sparse empirical
    support, the stable states are individual training examples. As support
    increases, memory basins interfere and spurious states appear. These
    generated attractors are absent from the training set, and their emergence
    marks the boundary where sample-level retrieval gives way to the onset of
    generalization.
  </p>
</div>

## The finite-data problem

<p align="justify">
Diffusion models are commonly described as models of a data distribution. We
study the finite-data version of this statement. Given a training set, what are
the stable states of the generative dynamics induced by optimal denoising?
</p>

<p align="justify">
The question is an attractor question. A generated sample is not only an output
of a learned sampler; it is a point reached by the denoising dynamics. If the
stable states coincide with training examples, generation is sample-level
retrieval. If stable states appear away from the training set, the model has
left the pure memorization regime.
</p>

<div class="tutorial-callout">
  <p>
    <strong>Question.</strong>
    How does the attractor structure of the empirical denoising energy change
    as the effective memory load increases?
  </p>
</div>

## Associative memory

<p align="justify">
Associative memories store patterns as minima of an energy function. Retrieval
is motion toward lower energy. When the stored patterns are isolated, retrieval
returns memories. When stored patterns interfere, the same energy can develop
additional minima that were never stored.
</p>

<p align="justify">
Dense Associative Memories express this retrieval structure through a softmax
competition between stored patterns:
</p>

<div class="equation-box">
$$
E_{\mathrm{DAM}}(x)
=
\frac{1}{2}\lVert x\rVert^2
-
\frac{1}{\beta}
\log \sum_{i=1}^{N}
\exp\left(\beta x^\top y_i\right).
$$
</div>

<p align="justify">
Here \(y_i\) are stored patterns and \(\beta\) controls retrieval selectivity.
At high selectivity, one stored pattern dominates. At intermediate memory load,
several stored patterns can shape the dynamics together. The resulting
landscape may contain spurious minima: stable retrieval endpoints that do not
correspond to stored patterns.
</p>

## The empirical denoising energy

<p align="justify">
The diffusion connection appears in the optimal denoising problem for a finite
empirical distribution. Let the training set be \(\{y_i\}_{i=1}^{N}\). Under
Gaussian corruption, the noisy-data density is a Gaussian mixture:
</p>

<div class="equation-box">
$$
p_\sigma(x)
=
\frac{1}{N}
\sum_{i=1}^{N}
\mathcal{N}\left(x;\, a_\sigma y_i,\, \sigma^2 I\right).
$$
</div>

<p align="justify">
The corresponding energy is \(E_\sigma(x) = -\log p_\sigma(x)\). Expanding the
mixture gives
</p>

<div class="equation-box">
$$
E_\sigma(x)
=
\frac{\lVert x\rVert^2}{2\sigma^2}
-
\log
\sum_{i=1}^{N}
\exp\left(
\frac{a_\sigma}{\sigma^2}x^\top y_i
-
\frac{a_\sigma^2}{2\sigma^2}\lVert y_i\rVert^2
\right)
+
C_\sigma .
$$
</div>

<p align="justify">
Up to constants and norm-dependent corrections, this is the same log-sum-exp
retrieval structure as Dense Associative Memory. For stored patterns with
comparable norms, the effective inverse temperature is
\(\beta_\sigma = a_\sigma / \sigma^2\). The optimal empirical denoising energy
therefore acts as a softmax memory over the training examples.
</p>

<div class="tutorial-callout">
  <p>
    <strong>Scope.</strong>
    This is a statement about the optimal empirical denoising energy. It does
    not claim that every trained neural network exactly realizes the analytic
    energy. It identifies the memory structure of the finite-data denoising
    problem.
  </p>
</div>

## Attractor regimes

<p align="justify">
Increasing the amount of empirical support changes the organization of local
minima. Sparse support gives isolated sample-level basins. Intermediate support
creates interference between basins. Dense support produces a broader
low-energy structure aligned with the data geometry.
</p>

<div class="phase-grid">
  <div class="phase-card">
    <img src="{{ site.baseurl }}/assets/img/memorization_generalization/train_2_samples.png" alt="Two-sample memorization regime">
    <h3>Sample-level retrieval</h3>
    <p align="justify">
      With few examples, individual samples define stable basins. Generation
      retrieves stored data.
    </p>
  </div>

  <div class="phase-card">
    <img src="{{ site.baseurl }}/assets/img/memorization_generalization/train_9_samples.png" alt="Intermediate spurious-state regime">
    <h3>Spurious retrieval</h3>
    <p align="justify">
      At the transition, memory basins interfere. New stable states appear away
      from the training samples.
    </p>
  </div>

  <div class="phase-card">
    <img src="{{ site.baseurl }}/assets/img/memorization_generalization/train_1000_samples.png" alt="Large-data generalization regime">
    <h3>Distribution-level structure</h3>
    <p align="justify">
      With denser support, the low-energy region is no longer organized only
      around individual observations.
    </p>
  </div>
</div>

<p align="justify">
The memorization-to-generalization transition is therefore an attractor
transition. Memorization corresponds to local minima at stored examples.
Spurious generation corresponds to local minima created by interference between
stored examples. Generalization begins when sample-level retrieval ceases to
dominate the generated distribution.
</p>

## Spurious states

<p align="justify">
Spurious states are the transition object. In associative memory, they are
stable endpoints of the retrieval dynamics that are not stored patterns. In the
diffusion setting, they appear as generated samples that are absent from the
training set but stable enough to recur under sampling.
</p>

<p align="justify">
This gives an operational distinction. A memorized sample is close to a
training example. A spurious sample is far from the training set but has close
neighbors among other generated samples. A generalized sample is neither a
training-set copy nor a recurring generated attractor.
</p>

<div class="tutorial-callout">
  <p>
    <strong>Diagnostic.</strong>
    The onset of generalization is detected not only by fewer training-set
    copies, but by the appearance of generated attractors away from the training
    data.
  </p>
</div>

<p align="justify">
This is the statistical-physics content of the result. Spurious states are not
sampling noise and not arbitrary artifacts. They are the expected unstable
middle regime of a memory system whose stored patterns begin to interfere.
</p>

## Low-dimensional geometry

<p align="justify">
In two dimensions, the attractors can be drawn directly. The red stars are
training samples, the yellow crosses are attractor states, and the vector field
shows the direction of retrieval. Darker regions correspond to lower energy.
</p>

<figure class="figure-panel">
  <img src="{{ site.baseurl }}/assets/img/memorization_generalization/2d-example.png" alt="Two-dimensional memorization, spurious, and generalization regimes">
  <figcaption>
    <strong>Figure 2.</strong>
    With sparse support, attractors coincide with stored examples. Near the
    transition, spurious attractors appear away from the training data. With
    dense support, the attractors follow a continuous low-energy structure.
  </figcaption>
</figure>

<div class="comparison-grid">
  <figure class="figure-panel">
    <img src="{{ site.baseurl }}/assets/img/memorization_generalization/exact_distribution.png" alt="Reference exact energy landscape">
    <figcaption>
      <strong>Reference landscape.</strong>
      The target distribution has continuous geometric structure. Generalization
      requires recovering this structure rather than only retrieving observed
      samples.
    </figcaption>
  </figure>

  <figure class="figure-panel">
    <img src="{{ site.baseurl }}/assets/img/memorization_generalization/energy_transition.png" alt="Energy transition from memorization to generalization">
    <figcaption>
      <strong>Energy transition.</strong>
      Increasing empirical support changes the landscape from isolated wells,
      through spurious minima, toward a connected low-energy region.
    </figcaption>
  </figure>
</div>

## Image-space evidence

<p align="justify">
In image space, the attractors are not visible. They must be inferred from
neighborhoods. Generated samples are compared to the training set and to one
another. This separates sample-level retrieval, spurious retrieval, and
distribution-level generation.
</p>

<figure class="figure-panel">
  <img src="{{ site.baseurl }}/assets/img/memorization_generalization/cifar10_memorized.PNG" alt="CIFAR-10 examples of memorization">
  <figcaption>
    <strong>Figure 3.</strong>
    Memorized samples are close to stored training examples. In the
    associative-memory view, they correspond to retrieval from isolated basins.
  </figcaption>
</figure>

<figure class="figure-panel">
  <img src="{{ site.baseurl }}/assets/img/memorization_generalization/cherry_picked.png" alt="Memorized, spurious, and generalized image examples">
  <figcaption>
    <strong>Figure 4.</strong>
    Generated samples are classified by their relation to training data and to
    other generated samples: stored memories, spurious attractors, and
    generalized samples.
  </figcaption>
</figure>

## Statistical-physics interpretation

<p align="justify">
The associative-memory formulation identifies the transition as a change in
attractor organization under increasing memory load. At low load, stored
examples are isolated minima and generation behaves as memory retrieval. At the
transition, memory basins interfere and spurious minima appear. Beyond pure
retrieval, the low-energy set becomes increasingly governed by the geometry of
the data distribution.
</p>

<div class="takeaway-grid">
  <div class="takeaway-card">
    <h3>Low memory load</h3>
    <p align="justify">
      Stored examples remain isolated attractors. Sampling returns training
      examples.
    </p>
  </div>

  <div class="takeaway-card">
    <h3>Transition regime</h3>
    <p align="justify">
      Basins interfere. Spurious attractors appear away from the training set.
    </p>
  </div>

  <div class="takeaway-card">
    <h3>Generalizing regime</h3>
    <p align="justify">
      Generation is no longer dominated by sample-level retrieval.
    </p>
  </div>
</div>

<p align="justify">
Our paper does not treat spurious states as secondary artifacts. They are the
transition signature. In classical associative memory, spurious states mark the
failure of exact recall. In diffusion models, the same phenomenon marks the
point where exact recall stops dominating and generative structure begins to
emerge.
</p>

<p align="justify">
Generalization is therefore not simply the absence of memorization. It is a
reorganization of the energy landscape: from isolated sample minima, through
spurious attractors, toward a low-energy structure aligned with the data
geometry.
</p>

## Citation

<pre><code>@article{pham2025memorization,
  title={Memorization to Generalization: Emergence of Diffusion Models from Associative Memory},
  author={Pham, Bao and Raya, Gabriel and Negri, Matteo and Zaki, Mohammed J. and Ambrogioni, Luca and Krotov, Dmitry},
  journal={arXiv preprint arXiv:2505.21777},
  year={2025},
  url={https://arxiv.org/abs/2505.21777}
}</code></pre>