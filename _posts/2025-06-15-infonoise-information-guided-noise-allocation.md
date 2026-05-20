---
layout: paper
title: "Noise Scheduling<br>as Information-Guided Allocation in Diffusion Training"
date: 2026-02-10
published: false
tags: diffusion noise-schedule efficient-training InfoNoise symmetry-breaking

affiliations:
  - "JADS & Tilburg University"
  - "Sony AI"
  - "University of Cambridge"
  - "Radboud University"
  - "Sony AI & Sony Group Corporation"

authors:
  - name: Gabriel Raya
    affil: 1
  - name: Bac Nguyen
    affil: 2
  - name: Georgios Batzolis
    affil: 3
  - name: Yuhta Takida
    affil: 2
  - name: Dejan Stancevic
    affil: 4
  - name: Naoki Murata
    affil: 2
  - name: Chieh-Hsin Lai
    affil: 2
  - name: Yuki Mitsufuji
    affil: 5
  - name: Luca Ambrogioni
    affil: 4

# Optional teaser stack. Use this only if the page template renders it cleanly.
image:
  - location: "assets/img/infonoise/entropy_evolution.gif"
  - location: "assets/img/infonoise/entropy_evolution_dna.gif"
  - location: "assets/img/infonoise/entropy_evolution_cifar10.gif"
  - location: "assets/img/infonoise/entropy_evolution_imagenet.gif"

teaser_title: '<p align="center"><strong>The useful training noise region is not fixed.</strong></p>'
teaser_caption: "The conditional entropy profile shows how uncertainty about the clean target $x_0$ changes across noise levels. The steep region marks where uncertainty is resolved fastest. This region shifts across datasets, resolutions, and representations, which is why fixed schedules often need retuning."

arxiv: "https://arxiv.org/abs/2602.18647"
# github: "https://github.com/gabrielraya/infonoise"

_styles: >
  .method { font-variant: small-caps; }

  .key-message {
    padding: 0.75rem 1rem;
    margin: 1rem 0 1.25rem;
    border-left: 4px solid #0079FF;
    background: rgba(0, 121, 255, 0.06);
    border-radius: 0 6px 6px 0;
    font-size: 1.02em;
  }

  .tldr-box {
    padding: 1rem 1.25rem;
    margin: 1rem 0 1.25rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    background: #fafafa;
  }

  .tldr-box ul {
    margin-bottom: 0;
    padding-left: 1.25rem;
  }

  .tldr-box li {
    margin-bottom: 0.35rem;
  }

  .contract-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
    margin: 1rem 0 1.25rem;
  }

  .contract-card {
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 12px;
    background: #fff;
    padding: 0.75rem 0.85rem;
  }

  .contract-kicker {
    font-size: 0.9rem;
    color: rgba(0,0,0,0.62);
    margin-bottom: 0.25rem;
  }

  .contract-title {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .contract-desc {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.35;
  }

  .figure-caption {
    margin-top: 1rem;
    font-size: 1em;
    color: #555;
    text-align: justify;
  }

  @media (max-width: 820px) {
    .contract-row { grid-template-columns: 1fr; }
  }
---

<p align="justify">
  Diffusion training is usually controlled by a noise schedule. The schedule is often treated as a technical choice, but it has a direct role: it decides which denoising problems the model sees during training. Together with the loss weight, it determines where optimization effort is spent along the corruption path.
</p>

<p align="justify">
  <span class="method">InfoNoise</span> starts from a simple allocation view. A schedule is the control variable. The information profile is the target. Instead of inheriting a fixed schedule from another dataset or retuning one by trial and error, <span class="method">InfoNoise</span> estimates where uncertainty about the clean sample is being resolved during training and adapts the training noise distribution toward that region.
</p>

<div class="contract-row">
  <div class="contract-card">
    <div class="contract-kicker">Problem</div>
    <div class="contract-title">Schedules allocate blindly</div>
    <p class="contract-desc">
      Fixed schedules choose where training updates go before measuring where the target data resolve uncertainty.
    </p>
  </div>
  <div class="contract-card">
    <div class="contract-kicker">Signal</div>
    <div class="contract-title">The information profile</div>
    <p class="contract-desc">
      Conditional-entropy rate identifies the noise levels where observations most rapidly reduce uncertainty about \(x_0\).
    </p>
  </div>
  <div class="contract-card">
    <div class="contract-kicker">Method</div>
    <div class="contract-title">Online allocation</div>
    <p class="contract-desc">
      InfoNoise estimates this profile from denoising losses and refreshes only the training noise distribution.
    </p>
  </div>
</div>

<div class="key-message">
  <strong>Core idea.</strong>
  Noise schedules decide where training happens. The information profile tells where training is useful. <span class="method">InfoNoise</span> estimates that profile online and updates the allocation during training.
</div>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">TL;DR</h2>

<div class="tldr-box">
  <ul>
    <li><strong>Diffusion training is an allocation problem.</strong> A model is trained on many denoising problems indexed by noise level, not on one task.</li>
    <li><strong>Schedules and loss weights induce effective allocation.</strong> The schedule controls how often each noise level is sampled; the loss weight controls how much that error matters.</li>
    <li><strong>The useful allocation is data-dependent.</strong> Different datasets, resolutions, and representations resolve uncertainty in different noise regions.</li>
    <li><strong>The information profile is the target.</strong> Conditional-entropy rate identifies where noisy observations most rapidly reduce uncertainty about \(x_0\).</li>
    <li><strong>InfoNoise estimates this target online.</strong> It uses denoising losses already computed during training and changes only the training noise distribution.</li>
    <li><strong>The empirical signature is asymmetric.</strong> InfoNoise preserves strong schedules when they are already aligned and improves compute efficiency when the informative region shifts.</li>
  </ul>
</div>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">The allocation view</h2>

<p align="justify">
  A diffusion model learns to reverse a corruption process. At each noise level, the model receives a corrupted observation \(x_u\) of a clean sample \(x_0\). Different noise levels define different posterior inference problems. At high noise, the observation may contain little recoverable information about the clean sample. At low noise, much of the structure may already be determined. Between these extremes lies the region where noisy observations change what can be inferred about \(x_0\).
</p>

<p align="justify">
  The training schedule decides how often these denoising problems are visited. The loss weight decides how strongly each error enters the objective. Once schedules are expressed in a common prediction space, these two factors combine into an effective allocation over the corruption path:
</p>

<p align="center">
  \[
  \phi(u) = \pi(u)w(u).
  \]
</p>

<p align="justify">
  Here, \(\pi(u)\) is the density with which path location \(u\) is sampled, and \(w(u)\) is the corresponding loss weight. This is why the schedule is not a standalone object. Its effect depends on the loss weighting and prediction parameterization. Different schedule-weight combinations can place the same effective training effort along the path.
</p>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Figure 1: the whole story</h2>

<figure class="text-center my-4" style="max-width: 920px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/overview.png"
       alt="InfoNoise allocation mismatch overview"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>The information profile defines the allocation target in diffusion training.</strong>
    <strong>(a)</strong> In a two-state Gaussian channel, uncertainty is not resolved uniformly along the path. The entropy-rate profile peaks at the decision window where noisy observations most rapidly reveal the clean state.
    <strong>(b)</strong> In mature image regimes, inherited schedules already place effort near the informative region, so <span class="method">InfoNoise</span> preserves the allocation while recovering this region online.
    <strong>(c)</strong> Under shift, the information profile moves while inherited allocation remains fixed, producing allocation mismatch. <span class="method">InfoNoise</span> estimates the shifted profile online and redirects training toward the region where uncertainty is resolved.
  </figcaption>
</figure>

<p align="justify">
  Panel (a) shows the local phenomenon. The model does not gain information about \(x_0\) at a constant rate. In the toy channel, the posterior first averages over possible clean states and then rapidly commits to one of them. The entropy-rate peak marks this decision window. It is not simply the place where uncertainty is largest. It is the place where uncertainty changes fastest.
</p>

<p align="justify">
  Panel (b) explains why strong image schedules often work. In mature image benchmarks, schedule design has already been shaped by years of empirical tuning. The inherited allocation overlaps the informative region, so online adaptation should mostly recover and preserve this allocation rather than move far away from it.
</p>

<p align="justify">
  Panel (c) shows the failure mode. When the representation, sequence structure, or modality changes, the informative region can move. A schedule inherited from images still places updates where they were useful in the source regime. The target regime then receives too many updates where noisy observations resolve little uncertainty. <span class="method">InfoNoise</span> adapts by estimating the shifted information profile online.
</p>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">The information profile</h2>

<p align="justify">
  Effective allocation describes where training effort is placed. The information profile describes where that effort is most informative. The relevant quantity is not the uncertainty that remains at a noise level, but the rate at which the noisy observation reduces uncertainty about \(x_0\) as we move along the path.
</p>

<p align="justify">
  For affine-Gaussian corruption paths,
</p>

<p align="center">
  \[
  x_u = a(u)x_0 + b(u)\epsilon,
  \qquad
  \epsilon \sim \mathcal N(0,I),
  \]
</p>

<p align="justify">
  the signal-to-noise ratio is \(\gamma(u)=a(u)^2/b(u)^2\). After standardization, the channel is equivalent to a Gaussian observation of \(x_0\). The I--MMSE identity links the rate of conditional entropy to Bayes-optimal denoising error:
</p>

<p align="center">
  \[
  \rho^\star(u)
  \propto
  \left|
  \frac{d}{du}H(X_0 \mid X_u)
  \right|
  =
  \frac{1}{2}|\gamma'(u)|\,\mathrm{MMSE}(u).
  \]
</p>

<p align="justify">
  Large values of \(\rho^\star(u)\) identify path locations where posterior uncertainty changes most rapidly. This is the target for allocation. A fixed schedule works when its induced allocation overlaps this profile. It wastes effort when the profile shifts and allocation remains inherited from a different regime.
</p>

<p align="justify">
  In VE coordinates, where \(x_\sigma=x_0+\sigma\epsilon\), this specializes to
</p>

<p align="center">
  \[
  \frac{d}{d\sigma}H(X_0\mid X_\sigma)
  =
  \frac{\mathrm{MMSE}(\sigma)}{\sigma^3}.
  \]
</p>

<p align="justify">
  This distinction matters. MMSE measures how much posterior uncertainty remains. Entropy rate marks where that uncertainty changes fastest. <span class="method">InfoNoise</span> uses this rate-like signal to decide where training allocation should move.
</p>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">From structure formation to allocation</h2>

<p align="justify">
  This view connects to our earlier work on <a href="{{ '/blog/2023/symmetry-breaking-diffusion-models/' | relative_url }}">spontaneous symmetry breaking in diffusion models</a>. That work studied generation as a trajectory with qualitatively different regimes. Some parts of the path remain weakly structured; other parts drive movement toward data-manifold structure.
</p>

<p align="justify">
  <span class="method">InfoNoise</span> asks the corresponding training question. If structure is recovered unevenly along the denoising path, then training effort should not be chosen without measuring where recovery happens. The information profile gives a concrete signal for this: it identifies where observations are most informative about the clean sample.
</p>

<figure class="text-center my-4" style="max-width: 760px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/toy_decision_window.png"
       alt="Toy decision window"
       class="img-fluid d-block w-100"
       style="border-radius: 8px 8px 0 0; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <img src="{{ site.baseurl }}/assets/img/infonoise/opitmal_denoiser.png"
       alt="Optimal denoiser diagnostic"
       class="img-fluid d-block w-100"
       style="border-radius: 0 0 8px 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.10); margin-top: 16px;"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>A decision window in the denoising path.</strong>
    In the toy problem, the optimal denoiser changes from averaging over possible clean samples to committing to one branch. The entropy-rate peak marks the same intermediate window. The CIFAR-10 diagnostic shows the same qualitative phenomenon: the largest changes in the optimal denoised prediction occur in an intermediate noise range, not uniformly across the path.
  </figcaption>
</figure>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Why schedules need retuning</h2>

<p align="justify">
  The information profile is not fixed by the algorithm alone. It depends on the data distribution, resolution, representation, and corruption path. This is why a schedule tuned in one regime may transfer poorly to another. It carries the source allocation into a target denoising problem without checking whether the informative region moved.
</p>

<p align="justify">
  Many hand-designed schedules can be read as different guesses about where the high-leverage band lies. Retuning a schedule often means moving probability mass until the induced allocation happens to overlap the informative region. In this sense, schedule search is repeated allocation search.
</p>

<figure class="text-center my-4" style="max-width: 760px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/schedule_zoo_diagram.png"
       alt="Schedule zoo and informative region"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>Hand-designed schedules are guesses about where training effort should go.</strong>
    Many schedules place probability mass over a narrow region of noise levels. They work when this region overlaps the information profile of the data. <span class="method">InfoNoise</span> estimates the informative region online instead of selecting it by schedule search.
  </figcaption>
</figure>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">How InfoNoise works</h2>

<p align="justify">
  <span class="method">InfoNoise</span> changes only one part of the training recipe: the training noise distribution. The objective, loss weighting, prediction parameterization, architecture, optimizer, EMA, augmentations, inference sampler, and evaluation budget remain fixed. This isolates the effect of training allocation.
</p>

<p align="justify">
  During training, denoising losses are already computed at sampled noise levels. <span class="method">InfoNoise</span> aggregates these losses by noise level, estimates the information profile, regularizes the estimate with lightweight calibration, and periodically refreshes the sampling distribution. The method is therefore not an auxiliary model, not a new denoising objective, and not an inference-time discretization trick. It is an online adaptation of where training updates are spent.
</p>

<figure class="text-center my-4" style="max-width: 760px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/infonoise_method_overview.png"
       alt="InfoNoise method overview"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>InfoNoise in one loop.</strong>
    Training losses are collected by noise level, converted into an online estimate of where uncertainty is being resolved, and used to refresh the training noise distribution. The learned profile can also be used to construct an inference grid, <em>InfoGrid</em>, at a fixed number of function evaluations.
  </figcaption>
</figure>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">What changes in practice</h2>

<p align="justify">
  The empirical prediction is asymmetric. If a fixed schedule already places effort near the information profile, online adaptation should preserve matched-budget quality and move little. If the profile shifts, adaptation should redirect training effort and reduce wasted updates.
</p>

<figure class="text-center my-4" style="max-width: 860px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/speedup_1x3.png"
       alt="InfoNoise matched and shifted speedup"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>InfoNoise preserves matched-budget quality and improves compute efficiency under shift.</strong>
    Speedup measures how much less training compute <span class="method">InfoNoise</span> needs to reach the final quality of the strongest fixed schedule under the same training recipe and evaluation budget.
  </figcaption>
</figure>

<p align="justify">
  This is the pattern we observe. In mature image regimes, tuned schedules already allocate near the informative region, so <span class="method">InfoNoise</span> preserves the quality of strong fixed schedules and sometimes reaches it earlier. In shifted representation and modality regimes, the informative region moves while inherited allocation remains fixed. There, <span class="method">InfoNoise</span> redirects training effort and reaches the strongest fixed-schedule target with up to \(3\times\) less training compute.
</p>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Alignment explains the gains</h2>

<p align="justify">
  The speedups are not just a generic effect of adaptivity. The alignment analysis compares the effective allocation induced by inherited schedules and by <span class="method">InfoNoise</span> against post hoc diagnostic information profiles. These diagnostic profiles are computed after training and are not given to <span class="method">InfoNoise</span> during training.
</p>

<figure class="text-center my-4" style="max-width: 920px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/matched_shifted_profile_datasets.png"
       alt="Matched and shifted information profile alignment"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>Alignment with the information profile determines whether schedule transfer succeeds.</strong>
    In CIFAR-10 and FFHQ, inherited image allocations already overlap the measured informative region, and <span class="method">InfoNoise</span> recovers a similar allocation online. In binarized images, DNA, and text, the informative region shifts away from the inherited allocation, and <span class="method">InfoNoise</span> redirects sampling toward the shifted profile without manual retuning.
  </figcaption>
</figure>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Schedule search is allocation search</h2>

<p align="justify">
  When practitioners adapt diffusion models to a new dataset or modality, they often retune the noise schedule by training several candidate settings and keeping the best one. In the allocation view, these trials are not mysterious. Each schedule setting induces a different allocation over noise levels. Retuning helps when the selected setting moves that allocation closer to the information profile.
</p>

<p align="justify">
  The EDM log-normal training distribution gives a clean example. Holding the objective, weighting, parameterization, model, optimizer, sampler, and evaluation fixed, changing \(P_{\mathrm{mean}}\) shifts the sampling density over \(\log\sigma\). This changes where training effort is placed. On DNA, performance improves as the allocation moves toward the measured information profile. <span class="method">InfoNoise</span> reaches the same informative region from online loss statistics in a single run.
</p>

<figure class="text-center my-4" style="max-width: 920px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/dna_edm_alignment_search_1x3.png"
       alt="DNA schedule search as allocation search"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>Schedule search is repeated allocation search.</strong>
    Changing only \(P_{\mathrm{mean}}\) shifts the EDM effective allocation along the DNA corruption path. Allocations closer to the information profile reach the strongest fixed schedule's final quality with fewer training updates. <span class="method">InfoNoise</span> reaches the same region online from one run.
  </figcaption>
</figure>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">The learned allocation stabilizes</h2>

<p align="justify">
  An adaptive schedule should not simply chase noisy loss fluctuations. In <span class="method">InfoNoise</span>, warm-up only seeds the first estimate. After the first rebuilds, sampling follows the online information profile. On DNA, changing the warm-up prior across EDM log-normal, log-uniform in \(\sigma\), and log-\(\sigma\) constant-entropy changes final Sei-FID by only \(0.007\), indicating that the final allocation is set by online adaptation rather than initialization.
</p>

<figure class="text-center my-4" style="max-width: 920px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/online_region_learning.png"
       alt="InfoNoise online profile learning and CDF convergence"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>InfoNoise moves toward the information profile and stabilizes.</strong>
    The online profile estimate moves toward the post hoc diagnostic profile, which is computed from a reference denoiser and never used during training. Sampler-CDF changes fall below \(10^{-2}\) after the first rebuilds, indicating stable allocation rather than loss-fluctuation tracking.
  </figcaption>
</figure>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Allocation gains persist under guidance</h2>

<p align="justify">
  Guidance changes the inference procedure, so it tests whether the benefit comes from training allocation rather than from a lucky unguided sampler. We evaluate the text model with classifier-free guidance while fixing the guidance scale, sampler, and training recipe. Only the training noise distribution differs. <span class="method">InfoNoise</span> reaches higher MAUVE sooner under the same guided sampler, indicating that the gain comes from training-time allocation rather than inference tuning.
</p>

<figure class="text-center my-4" style="max-width: 680px; margin-left: auto; margin-right: auto;">
  <img src="{{ site.baseurl }}/assets/img/infonoise/mauve_running_best_all.png"
       alt="InfoNoise guided language generation MAUVE"
       class="img-fluid d-block w-100"
       style="border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);"
       loading="lazy">
  <figcaption class="figure-caption">
    <strong>InfoNoise improves guided language generation.</strong>
    With the guided sampler fixed, the adaptive training allocation reaches higher MAUVE sooner than inherited fixed schedules.
  </figcaption>
</figure>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Why this matters</h2>

<p align="justify">
  Noise schedules are often treated as implementation details. They are not. Together with loss weighting, they decide which denoising problems dominate training. As diffusion models move beyond well-tuned image benchmarks into new representations, sequence domains, scientific data, and multimodal systems, schedule transfer becomes less reliable. The informative region can move, and fixed schedules do not know that it moved.
</p>

<p align="justify">
  <span class="method">InfoNoise</span> makes this allocation data-adaptive. It replaces repeated schedule search with an online estimate of where uncertainty is resolved in the current training regime. More broadly, it suggests that diffusion training should be organized around the information profile of the denoising problem, rather than around schedule families inherited from another domain.
</p>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">What to remember</h2>

<div class="tldr-box">
  <ul>
    <li><strong>The schedule is the control variable.</strong> It decides where training updates go.</li>
    <li><strong>The information profile is the target.</strong> It identifies where uncertainty about \(x_0\) is resolved.</li>
    <li><strong>The target moves.</strong> Datasets, resolutions, representations, and modalities can shift the informative region.</li>
    <li><strong>InfoNoise adapts online.</strong> It estimates the profile from denoising losses and refreshes the training noise distribution.</li>
    <li><strong>The intervention is minimal.</strong> Objective, loss weighting, prediction parameterization, architecture, optimizer, and sampler remain fixed.</li>
  </ul>
</div>

<h2 style="color: #363535 !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Links</h2>

<ul>
  <li><a href="https://arxiv.org/abs/2602.18647">Paper</a></li>
  <!-- <li><a href="https://github.com/gabrielraya/infonoise">Code</a></li> -->
</ul>
