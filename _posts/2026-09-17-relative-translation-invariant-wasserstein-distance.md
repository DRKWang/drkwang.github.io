---
layout: blog
title: "Relative Translation Invariant Wasserstein Distance
"
date: 2026-09-17
description: "A translation-invariant extension of Wasserstein distance for comparing the intrinsic geometry of probability distributions."
---

# Relative Translation Invariant Wasserstein Distance

Optimal transport provides a geometric way to compare probability distributions. Derived from this theory, the most widely used tools is the Wasserstein distance, which measures the minimum cost required to transport one distribution into another in the space of probability distributions. 

One limitation of the Wasserstein distance is its sensitivity to location: two distributions can have the same shape but still be far apart if one is translated in space. In this blog, we introduce the \textbf{Relative Translation Invariant Wasserstein distance}, denoted by $RW_p$, which addresses this limitation by comparing distributions up to translation.

The main idea is simple:

Align the two distributions through translation before measuring their intrinsic difference, rather than comparing them directly in the original coordinate system.

## Relative Translation Optimal Transport

Let $\mu$ and $\nu$ be two probability distributions in $\mathbb{R}^d$. We define the Relative Translation Optimal Transport (ROT) problem as

$$
\inf_{t\in\mathbb{R}^d}
\operatorname{OT}(\mu+t,\nu,p).
$$

Equivalently,

$$
\inf_{t\in\mathbb{R}^d}
W_p(\mu+t,\nu).
$$

Here, instead of comparing distributions in a fixed coordinate system, $RW_p$ searches for the translation that minimizes the transport cost.

A natural quotient-space interpretation is that: all translations of the same distribution belong to one equivalence class,

$$
[\mu]={\mu+t\in\mathbb{R}^d},
$$

and $RW_p$ defines a true metric on

$$
\mathcal{P}_p(\mathbb{R}^d)/{\sim_T}.
$$

So $RW_p$ measures the difference between distributions modulo translation.

## The Special Case $p=2$

The quadratic case has a particularly simple structure:

$$
W_2^2(\mu,\nu) = 
||\bar{\mu}-\bar{\nu}||_2^2
+
RW_2^2([\mu],[\nu])
$$

where $\bar{\mu}$ and $\bar{\nu}$ are the means of the two distributions.

This decomposition separates the Wasserstein distance into

$$
\underbrace{|\bar{\mu}-\bar{\nu}|_2^2}_{\text{translation}}
+
\underbrace{RW_2^2([\mu],[\nu])}_{\text{intrinsic distributional difference}}.
$$

The optimal translation is simply

$$
t^\star=\bar{\nu}-\bar{\mu}.
$$

For Gaussian distributions, this centered component reduces to the _Bures_ distance between covariance matrices, so $RW_2$ extends this geometric viewpoint beyond Gaussian distributions.

## Translation-Invariant Optimal Coupling

In the discrete quadratic case, the optimal coupling matrix is invariant under relative translation. 
Translating the distributions changes the numerical values of the cost matrix, but does not change the optimal transport plan.

As a result, we can first align the means,

$$
t^\star=\bar{\nu}-\bar{\mu},
$$

and then solve the transport problem using a better-conditioned cost matrix.

## Takeaway

The main idea behind $RW_p$ can be summarized as:

Separate where a distribution is from what the distribution looks like.

For $p=2$,

$$
||\bar{\mu}-\bar{\nu}||_2^2
+
RW_2^2([\mu],[\nu])
$$

cleanly separates translation from intrinsic distributional geometry.

## Paper and Code

Paper:
Relative Translation Invariant Wasserstein Distance
Binshuai Wang, Qiwei Di, Ming Yin, Mengdi Wang, Quanquan Gu, and Peng Wei.
Transactions on Machine Learning Research (TMLR), 2026.

Code:
https://github.com/DRKWang/rw_metric