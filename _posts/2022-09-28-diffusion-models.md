---
layout: distill
title: Diffusion models
description: An overview of diffusion models (work in progress).

date: 2022-07-26 0:00:00-0400


authors:
   - name: Gabriel Raya
     url: "https://gabrielraya.com/"

bibliography: 2018-12-22-distill.bib

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.



---

<p align="justify">
If you are reading this post, then you may have heard that diffusion models are kind of the <em>big thing</em> for generating high-quality image data. Simply see below.
</p>


<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0" >
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/diffusion/sample_quality_2.PNG" style="width: 200px;">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/diffusion/sample_quality.PNG"
        style="width: 200px;">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/diffusion/sample_quality_4.PNG"
        style="width: 200px;">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/diffusion/sample_quality_5.PNG"
        style="width: 200px;">
    </div>
</div>
<figcaption class="figure-caption text-center">Fig. 1. Samples generated by a Diffusion model (Song.et.al.<d-cite key="song2020score"></d-cite> ). </figcaption><br>
<p align="justify">
However, grasping diffusion models may seem initially daunting, and you may easily get confused by terms such as denoising diffusion models and score-based generative models. Therefore, this blog post aims to provide a big picture of diffusion models, whether you prefer to call them diffusion models, denoising diffusion models, or score-based diffusion models. All of them have the same roots, the diffusion process, so I will refer to them as Diffusion models and make it explicit when a singular idea comes from a particular approach.
</p>


For more in-depth information, I will always suggest reading the original papers:

- [Deep Unsupervised Learning using Nonequilibrium Thermodynamics](https://arxiv.org/abs/1503.03585)

I also recommend reading the following blog post, from which some information I have added here to provide a complete picture.  

- [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)

<p align="justify">
Before starting, I would like to recall that modeling high-dimensional distributions in a tractable way where training, sampling, and evaluating probabilities  is not easy. As a result, approximation techniques such as variational inference and sampling methods have been developed over the years. Now, with Diffusion models, we can do that and more!.
</p>




## What are diffusion models


<p align="justify">
Diffusion Models (DMs) are probabilistic models that are capable to model high-dimensional distribution using two diffusion process: 1) a   <em>forward diffusion process</em> maps data to a noise distribution, i.e., an isotropic Gaussian, and 2) a <em>reverse diffusion process</em> that moves samples from the noise distribution back to the data distribution. The essential idea, inspired by nonequilibrium statistical physics and introduced by Sohl-Dickstein et. al. <d-cite key="sohl2015deep"></d-cite>, is to <b>systematically</b> and slowly destroy structure in a data distribution through an iterative diffusion process. Then learn a reverse diffusion process that restores structure in data.  In this way, learning in a diffusion Model consists on estimating small perturbations which is more tractable that approximating the partition function.<br><br>

Stochastic process can be time-continuous or discrete. Because a diffusion process is a stochastic process, diffusion models can be time-continuous or discrete. I will start explaining time-discrete DMs.

</p>





### Discrete Diffusion models
Lets assume that our dataset consists of $N$ i.i.d inputs $$\{\mathbf{x}_0^n\}_{n=0}^N \sim q_0(\mathbf{x})$$ sampled from an unknown distribution $$q_0(\mathbf{x}_0)$$, where the lower-index is used to denoted the time-dependency in the diffusion process. The goal is to find a parametric model $p_{\theta}(\\mathbf{x}_0) \approx q_0(\\mathbf{x}_0)$ using a diffusion process that evolves over a discrete time variable $t\in[0,T]$


<div style="align: left; text-align:center;">
        <img class="img-fluid  " src="{{ site.baseurl }}/assets/img/diffusion/generative_markov_chain.PNG" style="width: 700px;">
        <figcaption class="figure-caption text-center">Figure 2. The directed graphical model for a discrete diffusion model is represented by a Markov Chain. The forward/reverse diffusion process systematically and  slowly adds/removes noise.</figcaption>
</div><br>

#### Forward trajectory

<p align="justify">
 The forward diffusion process will systematically perturbed the input data $\mathbf{x}_0$ using a perturbation kernel $q(\mathbf{x}_t \vert \mathbf{x}_{t-1})$ over time $t\in[0,T]$, gradually converting $q_0(\mathbf{x}_0)$ into a simple known distribution $q_T$ (e.g. a Gaussian) distribution. For example, the input $\mathbf{x}_0$, in figure 1 (going from right to left)gradually loses its distinguishable features as the step $t$ becomes larger. Eventually when $T \to \infty$, $\mathbf{x}_T$ is equivalent to an isotropic Gaussian distribution. Figure 1 shows with dotted line a forward diffusion step.  This <b>forward trajectory</b> or <b>forward diffusion process</b> is represented by a Markov chain.  The stationary distribution is choose by desing and so the forward process does not have learnable parameters. For example, Sohl-Dickstein et. al. <d-cite key="sohl2015deep"></d-cite> proposed the following perturbation kernel such that the stationary distribution is Isotropic Gaussian.
</p>


$$
q(\mathbf{x}_t \vert \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \sqrt{1 - \beta_t} \mathbf{x}_{t-1}, \beta_t\mathbf{I}) \quad
q(\mathbf{x}_{1:T} \vert \mathbf{x}_0) = \prod^T_{t=1} q(\mathbf{x}_t \vert \mathbf{x}_{t-1})
$$

<p align="justify">
where $\beta_t$ is the variance schedule, a sequence of positive noise scales such that $0 < \beta_1, \beta_2, ..., \beta_T < 1$.
The data sample $\mathbf{x}_0$

<a id="nice"></a>A nice property of the above process is that we can sample $\mathbf{x}_t$ at any arbitrary time step $t$ in a closed form using <a href="https://lilianweng.github.io/posts/2018-08-12-vae/#reparameterization-trick">reparameterization trick</a>. Let $\alpha_t = 1 - \beta_t$ and $\bar{\alpha}_t = \prod_{i=1}^t \alpha_i$, and now $q(\mathbf{x}_t \vert \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \sqrt{\alpha_t} \mathbf{x}_{t-1}, 1-\alpha_t\mathbf{I})$
</p>

<div>
$$
\begin{aligned}
\mathbf{x}_1 &= \sqrt{\alpha_1}\mathbf{x}_{0} + \sqrt{1 - \alpha_1}\mathbf{z}_{0} & \text{ ;where } \mathbf{z}_{0}, \mathbf{z}_{1}, \dots \sim \mathcal{N}(\mathbf{0}, \mathbf{I}) \\
\mathbf{x}_2 &= \sqrt{\alpha_2}\mathbf{x}_{1} + \sqrt{1 - \alpha_2}\mathbf{z}_{1}\\
&= \sqrt{\alpha_2}\left(\sqrt{\alpha_1}\mathbf{x}_{0} + \sqrt{1 - \alpha_1}\mathbf{z}_{0}\right) + \sqrt{1 - \alpha_2}\mathbf{z}_{1}\\
&= \sqrt{\alpha_2\alpha_1}\mathbf{x}_{0} + \sqrt{\alpha_2(1 - \alpha_1)}\mathbf{z}_{0} + \sqrt{1 - \alpha_2}\mathbf{z}_{1}\\
&= \sqrt{\alpha_2\alpha_1}\mathbf{x}_{0} + \sqrt{1 - \alpha_1\alpha_2}\bar{\mathbf{z}}_{1} & \text{ ;where } \bar{\mathbf{z}}_{1} \text{ merges two Gaussians (*).} \\
&= \dots \\
&= \sqrt{\bar{\alpha}_t}\mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t}\mathbf{z} \\
q(\mathbf{x}_t \vert \mathbf{x}_0) &= \mathcal{N}(\mathbf{x}_t; \sqrt{\bar{\alpha}_t} \mathbf{x}_0, (1 - \bar{\alpha}_t)\mathbf{I})
\end{aligned}
$$
</div>

<p align="justify">
(*) Recall that when we merge two Gaussians  with different variance, $\mathcal{N}(\mathbf{0}, \sigma_1^2\mathbf{I})$ and $\mathcal{N}(\mathbf{0}, \sigma_2^2\mathbf{I})$, the new distribution is $\mathcal{N}(\mathbf{0}, (\sigma_1^2 + \sigma_2^2)\mathbf{I})$. Using the property of $Var(aX) = a^2 Var(X)$ we have $Var(\sqrt{\alpha_2(1 - \alpha_1)}\mathbf{z}_{1})= \alpha_2(1 - \alpha_1)\mathbf{I}=$. Therefore, the
 merged standard deviation is $\sqrt{\alpha_2(1 - \alpha_1) + 1 - \alpha_2} = \sqrt{1 - \alpha_1\alpha_2}$.
 </p>


#### Reverse trajectory
 Then a generative Markov chain converts $q_T$, the simple distribution, into a target (data) distribution using a diffusion process. Figure 1 shows how the generative Markov chain is used to generated samples like the training distribution starting from $ x_T \sim p(x_T)$