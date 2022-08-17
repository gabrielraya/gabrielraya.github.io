---
layout: page
title: Lung cancer detection
description: Weakly Supervised NSCLC subtype classification in H&E stained whole-slide images
img: assets/img/pathology.jpg
importance: 3
category: work
---

Neural image compression for non-small cell lung cancer subtype classification in H&E stained whole-slide images: We explore unsupervised deep learning methods to classify lung cancer subtypes on histopathology images to directly classify non-small-cell lung cancer (NSCLC) into adenocarcinoma (LUAD) and squamous cell carcinoma (LUSC)  .


In the first phase the slides are compressed with a convolutional neural network (CNN) acting as an encoder. In the second phase the compressed slides are classified with another CNN. We trained our classification model on  > 2,000 NIC-compressed slides from the TCGA and TCIA databases and evaluated the model additionally on several internal and external cohorts. We show that NIC approaches state of the art performance on lung cancer classification, with an average AUC of 0.949 on the TCGA and TCIA testdata, and AUCs between 0.843 and 0.975 on other independent datasets.
Work together with Witali Aswolinskiy and Francesco Ciompi  at the Computational Pathology Group, Radboud University. 
