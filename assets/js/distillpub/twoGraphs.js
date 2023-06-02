
<!-- Add the script tag to include d3.js and math.js libraries -->
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/9.4.4/math.min.js"></script>

<style>
  .plot-container {
    display: flex;
    justify-content: center;
  }

  .plot {
    width: 48%;
    margin-bottom: 20px;
  }
</style>

<!-- HTML code for the plots -->
<div class="plot-container">
  <div class="plot" id="plot1">
    <input type="range" min="0" max="0.97" value="0.5" id="a-slider" step="0.01">
    <p id="slider-value"></p>
  </div>
  <div class="plot" id="plot2"></div>
</div>


<!-- Add a script tag to load the JSON data and create the plots -->
<script>
  // Load the JSON data for Plot 2
  d3.json('{{ site.baseurl }}/assets/img/ssdm/data.json').then(function(data) {
    var theta = data.theta;
    var x_up = data.x_up;
    var x_down = data.x_down;
    var x_mid = data.x_mid;

    // Set margins
    var margin = { top: 20, right: 50, bottom: 40, left: 50 };
    var width = 0.4 * Math.min(window.innerWidth, window.innerHeight) - margin.left - margin.right;
    var height = 0.8 * width; // Make the plot square-sized
    var theta_c = Math.sqrt(Math.sqrt(2) - 1); // Calculate theta_c

    console.log("Width value:", width);
    console.log("Height value:", height);
    console.log("theta_c:", theta_c);

    // Create SVG element for Plot 2
    var svg2 = d3.select("#plot2")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Determine the domain of x values
    var xDomain = d3.extent(theta, function(d) {
      return d;
    });

    // Determine the domain of y values
    var yDomain = d3.extent([...x_up, ...x_down, ...x_mid, 1.1], function(d) {
      return d;
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
      .x(function(d, i) {
        return xScale(theta[i]);
      })
      .y(function(d) {
        return yScale(d);
      });

    // Plot x_up for Plot 2
    svg2.append("path")
      .datum(x_up)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Plot x_down for Plot 2
    svg2.append("path")
      .datum(x_down)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Plot x_mid for Plot 2
    svg2.append("path")
      .datum(x_mid)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-dasharray", 2.5)
      .attr("d", line);

    // Add x-axis for Plot 2
    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // Add y-axis for Plot 2
    svg2.append("g")
      .call(d3.axisLeft(yScale));

    // Add x-axis label for Plot 2
    svg2.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .text("θ");

    console.log("Text for theta located at :", width / 2, height + margin.bottom - 10);

    // Add y-axis label for Plot 2
    svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .style("text-anchor", "middle")
      .text("x*");

    // Plot the stable and unstable regions for Plot 2
    svg2.append("path")
      .datum(theta.filter(function(d, i) {
        return d <= theta_c;
      }))
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2.5)
      .attr("d", line.y(function(d, i) {
        return yScale(x_mid[i]);
      }));

    svg2.append("line")
      .attr("x1", xScale(Math.sqrt(Math.sqrt(2) - 1)))
      .attr("y1", yScale(yDomain[0]))
      .attr("x2", xScale(Math.sqrt(Math.sqrt(2) - 1)))
      .attr("y2", yScale(yDomain[1]))
      .attr("stroke", "black")
      .attr("stroke-dasharray", "5,5");

    svg2.append("text")
      .attr("x", xScale(Math.sqrt(Math.sqrt(2) - 1)) + 2)
      .attr("y", yScale(yDomain[0]) - 2)
      .style("fill", "black")
      .style("font-size", "12px")
      .text("θ_c ≈ " + theta_c.toFixed(4));

    // Add circle and annotation for critical area for Plot 2
    var circle2 = svg2.append("ellipse")
      .attr("cx", xScale(theta_c))
      .attr("cy", yScale(0))
      .attr("rx", xScale(0.05) - xScale(0))
      .attr("ry", yScale(0) - yScale(0.3))
      .attr("stroke", "red")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

    svg2.append("text")
      .attr("x", xScale(theta_c) - 90)
      .attr("y", yScale(0.25))
      .attr("fill", "red")
      .style("font-size", "14px")
      .text("Critical Area");

    svg2.append("text")
      .attr("x", xScale(0.021))
      .attr("y", yScale(0.1))
      .attr("fill", "black")
      .style("font-size", "12px")
      .text("stable");

    svg2.append("text")
      .attr("x", xScale(0.91))
      .attr("y", yScale(0.1))
      .attr("fill", "black")
      .style("font-size", "12px")
      .text("unstable");

    svg2.append("text")
      .attr("x", xScale(0.91))
      .attr("y", yScale(1.1))
      .attr("fill", "black")
      .style("font-size", "12px")
      .text("stable");

    svg2.append("text")
      .attr("x", xScale(0.91))
      .attr("y", yScale(-1.15))
      .attr("fill", "black")
      .style("font-size", "12px")
      .text("stable");

    svg2.append("text")
      .attr("x", xScale(theta_c) + 10)
      .attr("y", yScale(-1.619))
      .attr("fill", "black")
      .style("font-size", "12px")
      .text("θ_c ≈ " + theta_c.toFixed(4));
  });

  // Load the JSON data for Plot 1
  d3.json('{{ site.baseurl }}/assets/img/ssdm/data.json').then(function(data) {
    var theta = data.theta;
    var x_up = data.x_up;
    var x_down = data.x_down;
    var x_mid = data.x_mid;

    // Set margins
    var margin = { top: 20, right: 50, bottom: 40, left: 50 };
    var width = 0.4 * Math.min(window.innerWidth, window.innerHeight) - margin.left - margin.right;
    var height = 0.8 * width; // Make the plot square-sized

    // Create SVG element for Plot 1
    var svg1 = d3.select("#plot1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
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

    function calculatePotential(x, t, beta_min, beta_max, T, N) {
      var beta_t = beta_min + (T - t) * (beta_max - beta_min);
      var theta = theta_fn(T - t, beta_max, beta_min);
      var exp1 = Math.exp(-0.5 * (x - theta) ** 2 / (1 - theta ** 2));
      var exp2 = Math.exp(-0.5 * (x + theta) ** 2 / (1 - theta ** 2));
      var log_term = Math.log(exp1 + exp2);
      return beta_t * (-0.25 * x ** 2 + 2 * Math.sqrt(2 * Math.PI * (1 - theta ** 2)) - log_term);
    }

    // Function to draw the graph for Plot 1
    function drawGraph(a) {
      // Clear the existing graph
      svg1.selectAll("*").remove();

      // Generate some data points based on the current value of a
      var data = d3.range(-5, 5, 0.1).map(function(x) {
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
        .text("X-axis");

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

    // Get a reference to the slider for Plot 1
    var aSlider = d3.select("#a-slider");

    // Get a reference to the text element for Plot 1
    var sliderValue = d3.select("#slider-value");

    // Draw the graph for Plot 1 with the initial value of a
    drawGraph(aSlider.property("value"));

    // Update the graph and slider value text whenever the slider changes
    aSlider.on("input", function() {
      drawGraph(this.value);
      console.log("Slider value:", this.value);

      // Update the slider value for Plot 2 as well
      d3.select("#a-slider2").property("value", this.value);
    });
  });
</script>
