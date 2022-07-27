---
layout: page
title: courses
permalink: /courses/
description: Materials for courses I taught to myself during my Ph.D. journey.
nav: False

---




<h4>First Year</h4>

<div class="row">
  <div class="column">
    <ul>
      <li><a href="http://en.wikipedia.org/wiki/Football">Bayesian Networks</a></li>
      <li><a href="http://en.wikipedia.org/wiki/Tennis">Statistical Machine Learning</a></li>
      <li><a href="http://en.wikipedia.org/wiki/Rugby_football">Machine Learning in particle Phys & Astro</a></li>
    </ul>  
  </div>
  <div class="column">
    <ul>
    <li><a href="http://en.wikipedia.org/wiki/Football">Neural Information Processing Systems</a></li>
    <li><a href="http://en.wikipedia.org/wiki/Tennis">Information Retrieval</a></li>
      <li><a href="http://en.wikipedia.org/wiki/Rugby_football">Rugby</a></li>
    </ul>
  </div>
</div>



<!-- <div class="projects grid">

  {% assign sorted_projects = site.courses| sort: "importance" %}
  {% for project in sorted_projects %}
  <div class="grid-item">
    {% if project.redirect %}
    <a href="{{ project.redirect }}" target="_blank">
    {% else %}
    <a href="{{ project.url | relative_url }}">
    {% endif %}
      <div class="card hoverable">
        {% if project.img %}
        <img src="{{ project.img | relative_url }}" alt="project thumbnail">
        {% endif %}
        <div class="card-body">
          <h2 class="card-title text-lowercase">{{ project.title }}</h2>
          <p class="card-text">{{ project.description }}</p>
          <div class="row ml-1 mr-1 p-0">
            {% if project.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ project.github }}" target="_blank"><i class="fab fa-github gh-icon"></i></a>
              </div>
              {% if project.github_stars %}
              <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                <i class="fas fa-star"></i>
                <span id="{{ project.github_stars }}-stars"></span>
              </span>
              {% endif %}
            </div>
            {% endif %}
          </div>
        </div>
      </div>
    </a>
  </div>
{% endfor %}

</div> -->
