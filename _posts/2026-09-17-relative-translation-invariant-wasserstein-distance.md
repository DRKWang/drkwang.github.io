---
layout: default2
title: "Relative Translation Invariant Wasserstein Distance"
date: 2026-09-17
description: "Introducing a translation-invariant extension of Wasserstein distance for comparing the intrinsic geometry of probability distributions."
---

# Relative Translation Invariant Wasserstein Distance

Optimal transport provides a powerful geometric way to compare probability distributions.

Among the most widely used tools in optimal transport is the **Wasserstein distance**, which measures the minimum cost required to transport one probability distribution into another. It has become increasingly important in machine learning, with applications ranging from generative modeling and domain adaptation to distributionally robust optimization.

However, classical Wasserstein distance contains an interesting limitation:

> Two distributions may have almost exactly the same shape, but if one is translated in space, their Wasserstein distance can still be large.

In our recent paper,

**"Relative Translation Invariant Wasserstein Distance"**

published in the *Transactions on Machine Learning Research (TMLR)*, we study this problem and introduce a family of distances called the **Relative Translation Invariant Wasserstein distances**, denoted by $RW_p$.

The central idea is simple:

> Before measuring how different two distributions are, allow them to align through translation.

This allows the distance to focus more directly on the **intrinsic geometric difference between distributions**, rather than their absolute locations.

---

## Why Translation Matters

Consider two probability distributions with exactly the same shape:

$$
\nu = \mu + t,
$$

where $t$ is a translation vector.

Under the classical Wasserstein distance,

$$
W_p(\mu,\nu)
$$

is generally nonzero because mass must be transported by approximately the translation vector $t$.

But structurally, the two distributions are identical.

For example, imagine two identical point clouds:

```text
Distribution A                     Distribution B

   •                                   •
 •   •                               •   •
   •                                   •

        <------ translation ------>
```

If our goal is to compare their **shape**, the translation should arguably not count as a difference.

This motivates a different question:

> What is the minimum Wasserstein distance between two distributions after allowing one distribution to translate?

---

## Relative Translation Optimal Transport

Let $\mu$ and $\nu$ be two probability distributions in $\mathbb{R}^d$.

We define the **Relative Translation Optimal Transport (ROT)** problem as

$$
\operatorname{ROT}(\mu,\nu,p)
=
\inf_{t\in\mathbb{R}^d}
\operatorname{OT}(\mu+t,\nu,p),
$$

where $t$ is a translation vector.

Equivalently, in terms of Wasserstein distance,

$$
RW_p([\mu],[\nu])
=
\inf_{t\in\mathbb{R}^d}
W_p(\mu+t,\nu).
$$

Instead of comparing the distributions in a fixed coordinate system, we search for the translation that produces the smallest transport cost.

Conceptually, classical Wasserstein distance asks

$$
\text{How much does it cost to transform } \mu \text{ into } \nu?
$$

while $RW_p$ asks

$$
\text{After optimally aligning their locations, how different are their structures?}
$$

This distinction becomes important whenever the absolute position of a distribution is less meaningful than its internal geometry.

---

## A Quotient-Space Interpretation

There is also a natural geometric interpretation of this construction.

Suppose we consider all translations of a distribution $\mu$,

$$
[\mu]
=
\{
\mu+t : t\in\mathbb{R}^d
\}.
$$

All distributions in this set have the same intrinsic shape and differ only by location.

We can therefore regard them as belonging to the same **equivalence class**.

Instead of defining a distance directly between individual distributions, we define a distance between these equivalence classes:

$$
RW_p([\mu],[\nu]).
$$

The resulting space is the quotient space

$$
\mathcal{P}_p(\mathbb{R}^d)/{\sim_T},
$$

where $\sim_T$ represents equivalence under translation.

An important theoretical result of our work is that

$$
\boxed{
RW_p
\text{ is a true metric on }
\mathcal{P}_p(\mathbb{R}^d)/{\sim_T}
}
$$

for every

$$
p\in[1,\infty).
$$

Thus, $RW_p$ is not simply a heuristic alignment procedure. It defines a mathematically valid geometry on probability distributions modulo translation.

---

## The Special Geometry of $RW_2$

The quadratic case,

$$
p=2,
$$

has a particularly elegant structure.

For two distributions $\mu$ and $\nu$, the squared Wasserstein distance can be decomposed as

$$
\boxed{
W_2^2(\mu,\nu)
=
\|\bar{\mu}-\bar{\nu}\|_2^2
+
RW_2^2([\mu],[\nu])
}
$$

where

$$
\bar{\mu},\qquad \bar{\nu}
$$

are the means of the two distributions.

This equation gives a useful interpretation of the classical Wasserstein distance.

It contains two components:

$$
\underbrace{\|\bar{\mu}-\bar{\nu}\|_2^2}_{\text{translation}}
+
\underbrace{RW_2^2([\mu],[\nu])}_{\text{intrinsic distributional difference}}.
$$

In other words,

> $RW_2$ extracts the centered component of the $W_2$ geometry.

The optimal translation in the quadratic case has the simple closed form

$$
t^\star
=
\bar{\nu}-\bar{\mu}.
$$

So for $p=2$, relative translation alignment corresponds exactly to aligning the means of the distributions.

---

## Connection to the Bures Distance

The decomposition becomes especially interesting for Gaussian distributions.

Let

$$
\mu=\mathcal{N}(\bar{\mu},\Sigma_\mu),
\qquad
\nu=\mathcal{N}(\bar{\nu},\Sigma_\nu).
$$

Their squared $2$-Wasserstein distance is

$$
W_2^2(\mu,\nu)
=
\|\bar{\mu}-\bar{\nu}\|_2^2
+
\operatorname{Tr}(\Sigma_\mu)
+
\operatorname{Tr}(\Sigma_\nu)
-
2\operatorname{Tr}
\left[
\left(
\Sigma_\mu^{1/2}
\Sigma_\nu
\Sigma_\mu^{1/2}
\right)^{1/2}
\right].
$$

The second component is the squared **Bures distance** between the covariance matrices.

Therefore,

$$
RW_2^2(\mu,\nu)
=
\operatorname{Tr}(\Sigma_\mu)
+
\operatorname{Tr}(\Sigma_\nu)
-
2\operatorname{Tr}
\left[
\left(
\Sigma_\mu^{1/2}
\Sigma_\nu
\Sigma_\mu^{1/2}
\right)^{1/2}
\right].
$$

This suggests an interesting interpretation:

> The Bures distance describes the centered Wasserstein geometry of Gaussian distributions, while $RW_2$ extends this idea to general probability distributions.

So $RW_2$ can be viewed as a distribution-level generalization of the centered geometry captured by the Bures metric.

---

## Something Unexpected Happens to the Optimal Coupling

Another useful result appears in the discrete quadratic case.

Suppose

$$
\mu=\sum_i a_i\delta_{x_i},
\qquad
\nu=\sum_j b_j\delta_{y_j}.
$$

The classical optimal transport problem solves for a coupling matrix $P$.

We show that, when the transport cost is quadratic,

$$
\|x_i-y_j\|_2^2,
$$

the **optimal coupling matrix is invariant under relative translations**.

That is, translating one of the distributions changes the numerical values of the transport costs, but does not change the optimal transport plan.

This property has an important computational consequence.

We are free to translate the distributions into a numerically better coordinate system before solving the optimal transport problem.

---

## Improving Numerical Stability

Why does this matter computationally?

Consider the Sinkhorn kernel

$$
K_{ij}
=
\exp\left(
-\frac{C_{ij}}{\lambda}
\right),
$$

where

$$
C_{ij}
=
\|x_i-y_j\|_2^2.
$$

If the two distributions are separated by a large translation, the entries of $C$ may become very large.

Then

$$
\exp\left(
-\frac{C_{ij}}{\lambda}
\right)
$$

can become extremely small, potentially causing numerical underflow.

But because the optimal coupling is translation invariant in the quadratic case, we can first align the means:

$$
t^\star
=
\bar{\nu}-\bar{\mu}.
$$

The new cost matrix becomes

$$
C'_{ij}
=
\|x_i+t^\star-y_j\|_2^2.
$$

This often produces much smaller coefficients while preserving the underlying optimal coupling structure.

Based on this observation, we develop two algorithms:

- **RW2-LP**, for linear-programming-based optimal transport;
- **RW2-Sinkhorn**, for entropy-regularized optimal transport.

An additional theoretical result is that translation does **not change the Hilbert-metric contraction factor of Sinkhorn iterations**.

Thus, alignment can improve numerical conditioning without sacrificing the geometric convergence rate of the Sinkhorn algorithm.

---

## General $RW_p$: Beyond the Quadratic Case

For

$$
p\neq2,
$$

the problem becomes considerably more interesting.

The optimal translation is no longer necessarily equal to the difference between the means.

We therefore solve

$$
\min_{t,P}
\sum_{i,j}
P_{ij}
\|x_i+t-y_j\|^p
$$

using an alternating optimization strategy.

The algorithm alternates between:

1. **Updating the transport plan $P$** while fixing $t$;
2. **Updating the translation $t$** while fixing $P$.

For fixed $t$, the problem reduces to a classical optimal transport linear program.

For fixed $P$, optimization over $t$ is convex.

We further use dual-simplex warm starts and Armijo backtracking to make the optimization more efficient and stable.

Although the overall problem can be non-convex when $d\ge2$, each individual update remains computationally tractable.

---

## What Does the Choice of $p$ Mean?

The parameter $p$ determines how strongly large transport displacements are penalized.

For example,

$$
RW_1
$$

is relatively tolerant of isolated outliers and local noise.

By contrast,

$$
RW_2
\quad\text{and}\quad
RW_4
$$

place progressively larger penalties on long-distance transport.

One way to interpret this is:

```text
smaller p
    ↓
more tolerant to local noise and outliers

larger p
    ↓
greater emphasis on global geometric shape
```

Thus, different values of $p$ naturally define different notions of distributional similarity.

---

## Numerical Experiments

We first evaluate whether the $RW_2$ decomposition improves the numerical stability of classical optimal transport algorithms.

For the LP experiments, we construct distributions under increasingly large translations.

The standard LP formulation accumulates larger numerical errors as translation magnitude increases, particularly in higher dimensions.

In contrast, the **RW2-LP** formulation maintains substantially smaller numerical error while keeping the running time comparable to the standard solver.

We observe a similar phenomenon with Sinkhorn.

As the translation magnitude grows, the standard Sinkhorn formulation becomes increasingly affected by the scale of the cost matrix.

The **RW2-Sinkhorn** formulation substantially reduces these errors by first removing the unnecessary translational component.

These experiments illustrate a useful principle:

> Mathematical invariance can sometimes be converted directly into numerical stability.

---

## Classical $W_2$ vs. $RW_p$

Classical $W_2$ simultaneously considers

- spatial position, and
- distributional structure.

Consequently, two structurally similar storms may still have a relatively large $W_2$ distance if they occur at different locations.

The $RW_p$ distance removes this dependence on global translation.

In the retrieval experiments, the proposed distances retrieve storms that more closely match the reference in terms of **shape and orientation**.

The different choices of $p$ also exhibit the expected behavior:

- $RW_1$ is more tolerant of sparse outliers;
- $RW_2$ provides a balance between local robustness and global geometry;
- $RW_4$ places greater emphasis on larger structural deviations.

We also evaluate thunderstorm **sequences**, where each example consists of six consecutive radar snapshots spanning one hour.

The results suggest that relative Wasserstein distances can capture not only static storm morphology but also similarities in the temporal evolution of storm structures.

---

## A Broader Geometric View

The framework suggests a more general perspective.

Sometimes we do not want to compare objects directly.

Instead, we want to compare them **up to a transformation**.

For translation, we consider

$$
\mathcal{P}_p(\mathbb{R}^d)/{\sim_T}.
$$

But similar ideas can be considered for other transformations, such as rotation.

More generally, one can imagine distributional geometries that factor out transformations that are irrelevant to a particular application:

$$
\text{distribution}
\quad\longrightarrow\quad
\text{equivalence class under transformations}.
$$

This perspective connects optimal transport with quotient spaces, invariant representations, geometric learning, and shape comparison.

---

## Takeaway

The main idea behind Relative Translation Invariant Wasserstein distance can be summarized in one sentence:

> Separate **where a distribution is** from **what the distribution looks like**.

Starting from classical optimal transport, $RW_p$ compares probability distributions after optimally accounting for relative translation.

For $p=2$, this leads to the decomposition

$$
\boxed{
W_2^2(\mu,\nu)
=
\|\bar{\mu}-\bar{\nu}\|_2^2
+
RW_2^2([\mu],[\nu])
}
$$

which cleanly separates translation from intrinsic distributional geometry.

Beyond its theoretical interpretation, this decomposition can also improve the numerical stability of LP and Sinkhorn optimal transport solvers.

There are many interesting directions that follow from this idea: rotation invariance, more general transformation groups, invariant distribution embeddings, and applications to high-dimensional machine learning.

---

## Paper and Code

**Paper:**  
*Relative Translation Invariant Wasserstein Distance*  
Binshuai Wang, Qiwei Di, Ming Yin, Mengdi Wang, Quanquan Gu, and Peng Wei.  
*Transactions on Machine Learning Research (TMLR), 2026.*

**Code:**  
[https://github.com/DRKWang/rw_metric](https://github.com/DRKWang/rw_metric)

---

*If you are interested in optimal transport, Wasserstein geometry, or distributional metrics, I plan to write more posts explaining the geometric ideas behind these methods.*