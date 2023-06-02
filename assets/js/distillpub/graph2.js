

## Plot 1
<!--
<style>
#graph {
    display: flex;
    justify-content: center;
}
</style>

<div id="graph"></div>

<input type="range" min="0" max="0.97" value="0.5" id="a-slider" step="0.01">

<!-- Add a text element to display the slider value -->
<p id="slider-value"></p>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script>
// Get a reference to the slider
var aSlider = d3.select("#a-slider");

// Get a reference to the text element
var sliderValue = d3.select("#slider-value");

// Set margins
var margin = { top: 20, right: 50, bottom: 40, left: 50 };
var width = 380 - margin.left - margin.right;
var height = 380 - margin.top - margin.bottom;

var width = 0.5*Math.min(window.innerWidth, window.innerHeight) - margin.left - margin.right;
var height = 0.8*width; // Make the plot square-sized

// Create SVG element
var svg = d3.select("#graph")
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

// Function to draw the graph
function drawGraph(a) {
  // Clear the existing graph
  svg.selectAll("*").remove();

  // Generate some data points based on the current value of a
  var data = d3.range(-5, 5, 0.1).map(function(x) {
    return {x: x, y: calculatePotential(x, a, 0.1, 20, 1.0, 1000)};
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
  svg.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 2.5)
     .attr("d", line);

  // Add x-axis
  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g")
     .call(d3.axisLeft(yScale));

  // Add x-axis label
  svg.append("text")
     .attr("x", width / 2)
     .attr("y", height + margin.bottom - 10)
     .style("text-anchor", "middle")
     .text("X-axis");

  // Add y-axis label
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("x", -height / 2)
     .attr("y", -margin.left + 20)
     .style("text-anchor", "middle")
     .text("u(x, T-t)");

     // Add the message if theta is between 0.62 and 0.65
     if (0.62 <= a && a <= 0.65) {
       svg.append("text")
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

// Draw the graph with the initial value of a
drawGraph(aSlider.property("value"));

// Update the graph and slider value text whenever the slider changes
aSlider.on("input", function() {
  drawGraph(this.value);
  console.log("Slider value:", this.value);
});
</script> -->
