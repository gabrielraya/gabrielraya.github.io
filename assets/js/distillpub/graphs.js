## Plotty
<!-- Add the necessary HTML elements -->
<div id="graph"></div>
<input type="range" id="lineSlider" min="0" max="1" step="0.01" value="0.78">

<!-- Add the script tag to include d3.js -->
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/9.4.4/math.min.js"></script>

<!-- Add a script tag to load the JSON data and create the plot -->
<script>
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

 // Set margins
 var margin = { top: 20, right: 50, bottom: 40, left: 50 };
 var width = 0.5 * Math.min(window.innerWidth, window.innerHeight) - margin.left - margin.right;
 var height = 0.8 * width; // Make the plot square-sized
 var theta_c = Math.sqrt(Math.sqrt(2) - 1); // Calculate theta_c

 // Create SVG element
 var svg = d3.select("#graph")
   .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 // Determine the domain of x values
 var xDomain = d3.extent([...theta,1.01], function(d) {
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

 // Plot x_up
 svg.append("path")
   .datum(x_up)
   .attr("fill", "none")
   .attr("stroke", "blue")
   .attr("stroke-width", 2)
   .attr("d", line);

 // Plot x_down
 svg.append("path")
   .datum(x_down)
   .attr("fill", "none")
   .attr("stroke", "orange")
   .attr("stroke-width", 2)
   .attr("d", line);

 // Plot x_mid
 svg.append("path")
   .datum(x_mid)
   .attr("fill", "none")
   .attr("stroke", "green")
   .attr("stroke-dasharray", "2.5")
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
   .text("θ");

 // Add y-axis label
 svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x", -height / 2)
   .attr("y", -margin.left + 20)
   .style("text-anchor", "middle")
   .text("x*");

 // Add quiver arrows
 svg.selectAll(".arrow")
   .data(v)
   .enter()
   .append("g")
   .selectAll("line")
   .data(function(d, i) {
     var arrows = [];
     for (var j = 0; j < d.length; j++) {
       var arrow = {
         x1: xScale(x_range[j]),
         y1: yScale(y_range[i]),
         x2: xScale(x_range[j] + 0.05 * u[i][j]),
         y2: yScale(y_range[i] + 0.9 * d[j]) // Use the magnitude from the JSON data
       };
       arrows.push(arrow);
     }
     return arrows;
   })
   .enter()
   .append("line")
   .attr("x1", function(d) { return d.x1; })
   .attr("y1", function(d) { return d.y1; })
   .attr("x2", function(d) { return d.x2; })
   .attr("y2", function(d) { return d.y2; })
   .attr("stroke", "black")
   .attr("stroke-width", 2.5)
   .attr("marker-end", "url(#arrow)")
   .attr("opacity", 0.4);

 // Add arrowhead marker
 svg.append("svg:defs")
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
 svg.append("path")
   .datum(theta.filter(function(d, i) {
     return d <= theta_c;
   }))
   .attr("fill", "none")
   .attr("stroke", "green")
   .attr("stroke-width", 2.5)
   .attr("d", line.y(function(d, i) {
     return yScale(x_mid[i]);
   }));

 // Add line
 svg.append("line")
   .attr("class", "line")
   .attr("x1", xScale(theta_c))
   .attr("y1", yScale(yDomain[0]))
   .attr("x2", xScale(theta_c))
   .attr("y2", yScale(yDomain[1]))
   .attr("stroke", "brown")
   .attr("stroke-width", 4)
   .attr("stroke-dasharray", "8,5");

 // Add line position text
 svg.append("text")
   .attr("class", "line-text")
   .attr("x", xScale(theta_c) + 10)
   .attr("y", yScale(yDomain[0]) - 2)
   .attr("fill", "black")
   .style("font-weight", "bold")
   .style("font-size", "12px")
   .text("θ = " + theta_c.toFixed(4));

 // Add circle and annotation for critical area
 var circle = svg.append("ellipse")
   .attr("cx", xScale(theta_c))
   .attr("cy", yScale(0))
   .attr("rx", xScale(0.05) - xScale(0))
   .attr("ry", yScale(0) - yScale(0.3))
   .attr("stroke", "red")
   .attr("fill", "none")
   .attr("stroke-width", 2)
   .attr("opacity", 0.8);

 svg.append("text")
   .attr("x", xScale(theta_c) - 90)
   .attr("y", yScale(0.25))
   .attr("fill", "red")
   .style("font-size", "13px")
   .style("font-weight", "bold")
   .text("Critical Area");

 svg.append("text")
   .attr("x", xScale(0.009))
   .attr("y", yScale(0.05))
   .attr("fill", "black")
   .style("font-size", "12px")
   .text("stable");

 svg.append("text")
   .attr("x", xScale(0.88))
   .attr("y", yScale(0.05))
   .attr("fill", "black")
   .style("font-size", "12px")
   .text("unstable");

 svg.append("text")
   .attr("x", xScale(0.91))
   .attr("y", yScale(1.1))
   .attr("fill", "black")
   .style("font-size", "12px")
   .text("stable");

 svg.append("text")
   .attr("x", xScale(0.91))
   .attr("y", yScale(-1.15))
   .attr("fill", "black")
   .style("font-size", "12px")
   .text("stable");


 // Slider event listener
d3.select("#lineSlider").on("input", function() {
  var value = d3.select(this).property("value");
  svg.select(".line")
    .attr("x1", xScale(value))
    .attr("x2", xScale(value));
  svg.select(".line-text")
    .attr("x", xScale(value) + 10)
    .text("θ = " + this.value);
  svg.select(".slider-value")
    .text("θ = " + this.value);
});


 svg.append("text")
   .attr("class", "slider-value")
   .attr("x", xScale(0.5))
   .attr("y", height + margin.bottom - 10)
   .attr("fill", "black")
   .style("text-anchor", "middle")
   .style("font-size", "12px")
   .text("θ = " + d3.select("#lineSlider").property("value").toFixed(4));
});
</script>
