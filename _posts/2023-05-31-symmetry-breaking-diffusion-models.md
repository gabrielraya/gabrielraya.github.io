---
layout: paper
title: "Spontaneous symmetry breaking in generative diffusion models"
date: 2023-05-31
tags: diffusion symmetry-breaking generative-models
authors:
  - name: Gabriel Raya
    url: "https://gabrielraya.com/"
    affiliations:
      name: JADS Research
      url: "https://www.jads.nl/"
  - name: Luca Ambrogioni
    url: "https://www.ru.nl/en/people/ambrogioni-l"
    affiliations:
      name: Radboud University


pdf:
  - location: "assets/img/ssdm/paper.pdf"

image:
  - location: "assets/img/ssdm/main_image_hq.png"


# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
  .list li {
    margin-top: 0.1em;
    margin-bottom: 0.1em;
  }
  .list ul {
    margin-top: 0.;
    margin-bottom: 0.;
    line-height: 1.1em;
  }
---



<h2 style="color: #363535  !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Summary</h2>

{% include scripts/script.html %}



<div class="list">
<ul>
  <li><p align="justify">We show that the generative dynamics of diffusion models exhibit a <em>spontaneous symmetry-breaking</em> phenomenon, resulting in two distinct generative phases:</p></li>
  <div class="list">
  <ul>
    <li><b>Phase 1</b>: A linear steady-state dynamics centered around a fixed point.</li>
    <li><b>Phase 2</b>: An attractor dynamics that guides the model towards the data manifold.</li>
  </ul>
  </div>
  <li><p align="justify">The period of instability during this transition contributes to the diversity of generated samples.</p></li>
  <li><p align="justify">We propose a Gaussian late initialization scheme that enhances model performance, resulting in up to a 3x FID improvement on fast samplers. This improvement is achieved by recognizing that the early phase does not significantly contribute to the model's performance.</p></li>
</ul>
<!-- <div style="align: left; text-align:center;" id="figure2">
        <img class="img-fluid  " src="{{ site.baseurl }}/assets/img/ssdm/1d-example-phase-portrait_.png" style="width: 70%;">
        <figcaption class="figure-caption text-center"><b>Figure 2</b>. Bifurcation analysis of the generative dynamics of a one-dimensional diffusion model, demonstrating a bifurcation at the critical value θc</figcaption>
</div> -->
</div>

<h2 style="color: #363535  !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Abstract</h2>

<p align="justify">
 Generative diffusion models have recently emerged as a leading approach for generating high-dimensional data. In this paper, we show that the dynamics of these models exhibit a spontaneous symmetry breaking that divides the generative dynamics into two distinct phases: 1) A linear steady-state dynamics around a central fixed-point and 2) an attractor dynamics directed towards the data manifold. These two "phases'' are separated by the change in stability of the central fixed-point, with the resulting window of instability being responsible for the diversity of the generated samples. Using both theoretical and empirical evidence, we show that an accurate simulation of the early dynamics does not significantly contribute to the final generation, since early fluctuations are reverted to the central fixed point. To leverage this insight, we propose a Gaussian late initialization scheme, which significantly improves model performance, achieving up to 3x FID improvements on fast samplers, while also increasing sample diversity (e.g., racial composition of generated CelebA images). Our work offers a new way to understand the generative dynamics of diffusion models that has the potential to bring about higher performance and less biased fast-samplers.
 </p>

<h2 style="color: #363535  !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Spontaneous symmetry breaking in one-dimensional diffusion models</h2>

<p align="justify">
To illustrate spontaneous symmetry breaking in diffusion models, we begin with a one-dimensional example. We use a dataset consisting of only two points: -1 and 1, each with an equal probability of selection (See Figure 1a). For the purpose of our analysis, we re-express the generative dynamics of the diffusion model in terms of a potential energy function \(u(x, t)\). The corresponding potential equation for the VP-SDE (DDPM), ignoring constant terms, is the following:
<div id="equation" style="text-align: center;">
    <img class="img-fluid" src="{{ site.baseurl }}/assets/img/ssdm/eq1.png" style="max-width: 85%; display: inline-block;">
</div>
</p>
<!--
\begin{equation}
    u(x, t) = \beta(T - t) \left( -\frac{1}{4} x^2 -  \log{\left(e^{-\frac{(x - \theta_{T-t})^2}{2 (1 - \theta_{T-t}^2)}} + e^{-\frac{(x + \theta_{T-t})^2}{2 (1 - \theta_{T-t}^2)}} \right)} \right)
\end{equation} -->
<p align="justify">
We can now analyze how the potential \(u(x, t)\) evolves over time as we change the parameter \(\theta\). A symmetry-breaking event is marked by a notable change in the shape of the potential well. For instance, after reaching a critical value \(\theta_c\), the potential splits, indicating a shift in the dynamics. Prior to the critical point, the system exhibits mean-reversion towards a stable fixed-point located at the origin \(x=0\)
(See the figure below on the right, indicated by the <span style="color: green; font-weight: bold;">green</span> line.). However, once the symmetry breaking occurs, this stable point becomes unstable (dashed <span style="color: green;">green</span> line.), giving rise to the emergence of two new stable points (shown in <span style="color: blue; font-weight: bold;">blue</span> and <span style="color: orange; font-weight: bold;">orange</span>). These points act as attractors, guiding the system towards the data manifold.

By exploring the potential below, you can observe the expected change in the shape of the potential well at the critical value \(\theta_c\), as described theoretically in our paper. In the left graph, you can manipulate the potential well, while the right graph shows the corresponding solution for \(x\). The vertical <span style="color: brown; font-weight: bold;">brown</span> dashed line represents the position of the parameter \(\theta_c\). The picture on the right depicts a pitchfork bifurcation, which captures a qualitative change in the behavior of the dynamical system as a parameter is varied, in this case \(\theta\).<p style="color: blue !important; font-weight: bold;">Experience symmetry breaking in diffusion models! Play with the potential and witness the magic!</p>


</p>


<!-- Add the necessary HTML elements -->
<div id="container" style="display: flex; flex-wrap: wrap; justify-content: space-between; max-width: 100%;" >
  <div id="plot1" style="flex: 1; margin-right: 20px; box-sizing: border-box;"></div>
  <div id="plot2" style="flex: 1; box-sizing: border-box;"></div>
</div>

<!-- Add the script tags to include d3.js -->
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/9.4.4/math.min.js"></script>

<input type="range" min="0" max="0.97" value="0.0" id="a-slider" step="0.01">
<!-- Add a text element to display the slider value -->
<p id="slider-value"></p>


<script>
  // Get a reference to the slider
  var aSlider = d3.select("#a-slider");
  // Get a reference to the text element
  var sliderValue = d3.select("#slider-value");

  // Load the JSON data
  d3.json('{{ site.baseurl }}/assets/img/ssdm/data.json').then(function(data) {
    var theta = data.theta;
    var x_up = data.x_up;
    var x_down = data.x_down;
    var x_mid = data.x_mid;
    var x_range = data.x_range;
    var y_range = data.y_range;
    var u = data.u;
    var v = data.v;

    // Set margins and dimensions
    var margin = { top: 20, right: 0, bottom: 40, left: 50 };
    var width = 0.35 * Math.min(window.innerWidth, window.innerHeight) - margin.left - margin.right;
    var height = 0.8 * width; // Make the plots square-sized
    var theta_c = Math.sqrt(Math.sqrt(2) - 1); // Calculate theta_c

    // Determine the domain of x values
    var xDomain = d3.extent([...theta, 1.01], function(d) {
      return d;
    });


    // Determine the domain of y values
    var yDomain = d3.extent([...x_up, ...x_down, ...x_mid, 1.1], function(d) {
      return d;
    });

    // Create scales
    var xScale1 = d3.scaleLinear()
      .domain(xDomain)
      .range([0, width]);

    var yScale1 = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);

    var xScale2 = d3.scaleLinear()
      .domain(xDomain)
      .range([0, width]);

    var yScale2 = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);

    // Create line function
    var line = d3.line()
      .x(function(d, i) {
        return xScale1(theta[i]);
      })
      .y(function(d) {
        return yScale1(d);
      });

      // Create SVG element for Plot 1
      var svg1 = d3.select("#plot1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Create SVG element for Plot 2
      var svg2 = d3.select("#plot2")
        .append("svg")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Function to compute the value of theta_fn
    function theta_fn(s, beta_max, beta_min) {
      if (Array.isArray(s)) {
        for (var i = 0; i < s.length; i++) {
          if (!(0 <= s[i] && s[i] <= 1)) {
            throw new Error("t should be in the interval [0, 1]");
          }
        }
      } else {
        if (!(0 <= s && s <= 1)) {
          throw new Error("t should be in the interval [0, 1]");
        }
      }

      var factor = -0.25 * s ** 2 * (beta_max - beta_min) - 0.5 * s * beta_min;
      return Math.exp(factor);
    }

    // Function to draw the graph for Plot 1
    function drawGraph1(a) {
      // Clear the existing graph
      svg1.selectAll("*").remove();

      // Generate data points based on the current value of a
      var data = d3.range(-3, 3, 0.1).map(function(x) {
        return { x: x, y: calculatePotential(x, a, 0.1, 20, 1.0, 1000) };
      });

      // Determine the domain of x values
      var xDomain = d3.extent(data, function(d) {
        return d.x;
      });

      // Determine the domain of y values
      var yDomain = d3.extent(data, function(d) {
        return d.y;
      });

      // Create scales
      var xScale = d3.scaleLinear()
                     .domain(xDomain)
                     .range([0, width]);

      var yScale = d3.scaleLinear()
                     .domain(yDomain)
                     .range([height, 0]);

      // Create line
      var line = d3.line()
                   .x(function(d) { return xScale(d.x); })
                   .y(function(d) { return yScale(d.y); });

      // Add the line to the SVG
      svg1.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr("d", line);

      // Add x-axis
      svg1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      // Add y-axis
      svg1.append("g")
        .call(d3.axisLeft(yScale));

      // Add x-axis label
      svg1.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text("x");

      // Add y-axis label
      svg1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .style("text-anchor", "middle")
        .text("u(x, T-t)");

      // Add the message if theta is between 0.62 and 0.65
      if (0.62 <= a && a <= 0.65) {
        svg1.append("text")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .style("text-anchor", "middle")
          .style("font-size", "16px")
          .style("font-weight", "bold")
          .style("fill", "red")
          .text("Symmetry breaking at θ ≈ 0.64");
      }
      // Update the slider value text
      sliderValue.text("θ = " + a);
    }

    // Function to calculate the potential for Plot 1
    function calculatePotential(x, t, beta_min, beta_max, T, N) {
      var beta_t = beta_min + (T - t) * (beta_max - beta_min);
      var theta = theta_fn(T - t, beta_max, beta_min);
      var exp1 = Math.exp(-0.5 * (x - theta) ** 2 / (1 - theta ** 2));
      var exp2 = Math.exp(-0.5 * (x + theta) ** 2 / (1 - theta ** 2));
      var log_term = Math.log(exp1 + exp2);
      return beta_t * (-0.25 * x ** 2 + 2 * Math.sqrt(2 * Math.PI * (1 - theta ** 2)) - log_term);
    }

    // Function to draw the graph for Plot 2
    function drawGraph2(a) {
      // Clear the existing graph
      svg2.selectAll("*").remove();

      // Plot x_up
      svg2.append("path")
        .datum(x_up)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Plot x_down
      svg2.append("path")
        .datum(x_down)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Plot x_mid
      svg2.append("path")
        .datum(x_mid)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-dasharray", "2.5")
        .attr("d", line);

      // Add x-axis
      svg2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale2));

      // Add y-axis
      svg2.append("g")
        .call(d3.axisLeft(yScale2));

      // Add x-axis label
      svg2.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text("θ");

      // Add y-axis label
      svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .style("text-anchor", "middle")
        .text("x*");

      // Add quiver arrows
      svg2.selectAll(".arrow")
        .data(v)
        .enter()
        .append("g")
        .selectAll("line")
        .data(function(d, i) {
          var arrows = [];
          for (var j = 0; j < d.length; j++) {
            var arrow = {
              x1: xScale2(x_range[j]),
              y1: yScale2(y_range[i]),
              x2: xScale2(x_range[j] + 0.05 * u[i][j]),
              y2: yScale2(y_range[i] + 0.9 * d[j]) // Use the magnitude from the JSON data
            };
            arrows.push(arrow);
          }
          return arrows;
        })
        .enter()
        .append("line")
        .attr("x1", function(d) {
          return d.x1;
        })
        .attr("y1", function(d) {
          return d.y1;
        })
        .attr("x2", function(d) {
          return d.x2;
        })
        .attr("y2", function(d) {
          return d.y2;
        })
        .attr("stroke", "black")
        .attr("stroke-width", 2.5)
        .attr("marker-end", "url(#arrow)")
        .attr("opacity", 0.4);

      // Add arrowhead marker
      svg2.append("svg:defs")
        .append("svg:marker")
        .attr("id", "arrow")
        .attr("refX", 3)
        .attr("refY", 2)
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,0 L0,4 L3,2 z")
        .attr("fill", "black");

      // Plot the stable and unstable regions
      svg2.append("path")
        .datum(theta.filter(function(d, i) {
          return d <= theta_c;
        }))
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2.5)
        .attr("d", line.y(function(d, i) {
          return yScale2(x_mid[i]);
        }));

      // Add line
      svg2.append("line")
        .attr("class", "line")
        .attr("x1", xScale2(theta_c))
        .attr("y1", yScale2(yDomain[0]))
        .attr("x2", xScale2(theta_c))
        .attr("y2", yScale2(yDomain[1]))
        .attr("stroke", "brown")
        .attr("stroke-width", 4)
        .attr("stroke-dasharray", "8,5");

      // Add line position text
      svg2.append("text")
        .attr("class", "line-text")
        .attr("x", xScale2(theta_c) + 10)
        .attr("y", yScale2(yDomain[0]) - 2)
        .attr("fill", "black")
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .text("θ = " + theta_c.toFixed(4));

      // Add circle and annotation for the critical area
      var circle = svg2.append("ellipse")
        .attr("cx", xScale2(theta_c))
        .attr("cy", yScale2(0))
        .attr("rx", xScale2(0.05) - xScale2(0))
        .attr("ry", yScale2(0) - yScale2(0.3))
        .attr("stroke", "red")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("opacity", 0.8);

      svg2.append("text")
        .attr("x", xScale2(theta_c) - 90)
        .attr("y", yScale2(0.25))
        .attr("fill", "red")
        .style("font-size", "13px")
        .style("font-weight", "bold")
        .text("Critical Area");

      svg2.append("text")
        .attr("x", xScale2(0.006))
        .attr("y", yScale2(0.05))
        .attr("fill", "black")
        .style("font-size", "11px")
        .text("stable");

      svg2.append("text")
        .attr("x", xScale2(0.85))
        .attr("y", yScale2(0.05))
        .attr("fill", "black")
        .style("font-size", "11px")
        .text("unstable");

      svg2.append("text")
        .attr("x", xScale2(0.905))
        .attr("y", yScale2(1.1))
        .attr("fill", "black")
        .style("font-size", "11px")
        .text("stable");

      svg2.append("text")
        .attr("x", xScale2(0.905))
        .attr("y", yScale2(-.94))
        .attr("fill", "black")
        .style("font-size", "11px")
        .text("stable");

      // Update the slider value text
      d3.select("#slider-value").text("θ = " + a.toFixed(4));
    }

    // Slider event listener
    d3.select("#a-slider").on("input", function() {
      var value = d3.select(this).property("value");
      drawGraph1(value);

      // move line plot 2

      svg2.select(".line")
        .attr("x1", xScale2(value))
        .attr("x2", xScale2(value));
      svg2.select(".line-text")
        .attr("x", xScale(value) + 10)
        .text("θ = " + this.value);
      svg2.select(".slider-value")
        .text("θ = " + this.value);
    });





    // Draw the initial graphs
    drawGraph1(0.);
    drawGraph2(0.);
  });
</script>

<p align="justify">
In summary, we are studying how the shape of the potential changes as we change  \(\theta\). A critical point marks a shift in the potential, leading to the emergence of new stable points that guide the system towards specific patterns. You can explore these ideas by manipulating the potential graph and observing the corresponding changes in the system's behavior.
</p>

<h2 style="color: #363535  !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Spontaneous symmetry breaking in trained diffusion models</h2>
<h3 style="color: #363535  !important; font-size: 22px !important; font-family: Arial, sans-serif !important;">Late start initialization</h3>

In trained diffusion models, this phenomenon can be observed by analyzing the generative performance as a function of time. We discovered that the performance remains largely unchanged and then rapidly deteriorates after reaching a 'critical time'.

<div id="figure2">
    <img class="img-fluid" src="{{ site.baseurl }}/assets/img/ssdm/late_start.png" style="width: 100%;">
    <figcaption class="figure-caption" style="text-align: justify;"><b>Figure 2</b>. Analysis of the model’s performance, as measured by FID scores, for different starting times using three different sampling methods: the normal DDPM sampler with decreasing time steps from T = 1000 to 0, and fast sampler DDIM and PSDM for 10 and 5 denoising steps. The vertical line corresponds to the maximum of the second derivative of the FID curve, which offers a rough estimate of the first bifurcation time. (e) Illustrates sample generation on Imagenet64, while progressively varying the starting time from 1000 to 100.</figcaption>
</div>




### Boost performance on fast samplers

<p align="justify">
In practice, we can initiate the diffusion process just before the critical time, as the distribution remains close to a multivariate Gaussian distribution. To leverage this, we propose a Gaussian initialization scheme called "Gaussian late start" (gls). It involves estimating the mean and covariance matrix of the noise-corrupted dataset at the initialization time and using the resulting Gaussian distribution as the starting point of sample generation. This addresses the distributional mismatch issue that arises from a late start initialization. Tables 1a, 1b, and 1c present results for stochastic DDPM and deterministic dynamics using the DDIM and PNDM samplers, demonstrating the performance boost achieved by the Gaussian late start approach in the vanilla samplers.
</p>
<div id="table1" style="text-align: center;">
    <img class="img-fluid" src="{{ site.baseurl }}/assets/img/ssdm/results.png" style="width: 100%;">
  <figcaption class="figure-caption" style="text-align: justify;">Table 1: Summary of findings regarding image generation quality, as measured by FID scores. The performance of the stochastic DDPM sampler (a) is compared to the deterministic DDIM (b) and PNDM (c) samplers in the vanilla case, as well as our Gaussian late start initialization scheme denoted as "gls". Results are presented for 3, 5, and 10 denoising steps (denoted as "n") across diverse datasets.</figcaption>
</div>



###  The Striking Performance Boost

<p align="justify">
The performance boost is striking in some datasets, with a 2x increase in CelebA 32 for 10 denoising steps and a 3x increase for 5 denoising
steps. As evidenced by the results showcased in Figure 3.
</p>
<div id="figure3" style="text-align: center;">
    <img class="img-fluid" src="{{ site.baseurl }}/assets/img/ssdm/ddpm_results.PNG" style="width: 100%;">
    <figcaption class="figure-caption" style="text-align: justify;">Figure 3.  Comparison of stochastic DDPM samplers on CelebA64 with varying denoising steps. Subfigures (a) and (c) represent the generative model performance for 5 denoising steps, while (b) and (d) showcase the results for 10 denoising steps. The DDPM was initialized with the common standard initialization point sstart = 800 for 5 steps and sstart = 900 for 10 steps. Notably, our Gaussian late start initialization (gls-DDPM) with sstart = 400 for both 5 and 10 denoising steps demonstrates significant improvements in FID scores and diversity, leveraging spontaneous symmetry breaking in diffusion models.</figcaption>
</div>


### Diversity analysis
Our analysis suggests that to achieve diverse and high-quality samples, it is crucial to sample within a specific time window around the critical time. This is because small changes during this window are amplified by the system's instability and have a significant impact on the final samples. In light of this, our Gaussian late initialization method improves sample diversity compared to the standard fast-sampler (see Figure 4.).

<div style="align: left; text-align:center;" id="figure4">
        <img class="img-fluid  " src="{{ site.baseurl }}/assets/img/ssdm/diversity_analysis.png" style="width: 100%;">
        <figcaption class="figure-caption" style="text-align: justify;">Figure 4. “Race” diversity analysis on CelebA64 over 50,000 generated samples by (c) gls-DDIM
and (d) DDIM samplers with 5 denoising steps. Results obtained on (a) training set and (b) DDPM using 1000 denoising steps are provided for reference. Corresponding samples obtained by each set are shown on top of the pie charts.</figcaption>
</div>



<h2 style="color: #363535  !important; font-size: 32px !important; font-family: Arial, sans-serif !important;">Citation</h2>
<pre>
<code>
@article{raya2023spontaneous,  
title={Spontaneous symmetry breaking in generative diffusion models},  
author={Gabriel Raya and Luca Ambrogioni},  
year={2023},  
journal={arXiv preprint arxiv:2305.19693}  
}
</code>
</pre>
