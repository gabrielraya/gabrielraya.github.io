---
layout: page
permalink: /publications/
title: publications
description:
years: [2026, 2025, 2024, 2021, 2020]
nav: true
---

<p>Full list of publications by year. PDF, code, and blog links are provided where available.</p>

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
