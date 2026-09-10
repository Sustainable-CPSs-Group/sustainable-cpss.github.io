---
title: Predictive maintenance without maintenance
date: 2026-08-18T10:00:00+02:00
description: A sensor that needs its battery changed is just another maintenance task. What would it take to remove it?
tags: [publications, energy-harvesting, tinyml]
hero: /assets/img/blog/predictive-maintenance/architecture.png
heroAlt: Batteryless sensor architecture and fan case study pipeline
bibliography: predictive-maintenance.bib
---

Our demo paper **“Predictive Maintenance without Maintenance”** has been accepted at **RTCSA 2026** [@kindt2026predictive]. It is joint work by Philipp H. Kindt, Sebastiano Gaiardelli, Marco Caccamo, Thomas Wild, Andreas Herkersdorf, and Samarjit Chakraborty.

## The problem with the premise

Predictive maintenance is supposed to remove maintenance tasks. On an AI-supported factory floor it is really a *data-availability* problem: an agent asked to raise throughput, cut energy use, or schedule service before a failure needs fine-grained observations from many machines at once. Machine-internal sensors are usually built for control loops or safety interlocks, so their data is coarse, proprietary, or simply not exposed. Retrofitted wireless sensors listening to vibration, sound, and temperature can close that gap and make every motor, pump, and gear observable.

Except that a battery-powered sensor is itself a maintenance task. Batteries cap lifetime, complicate dense deployments, and are hopeless for sealed infrastructure — you cannot mould a coin cell into a bridge. Wiring has the opposite problem: cost, planning, and fixed infrastructure. The sensing layer ends up limiting the very thing it was installed to extend.

So we target the other design point: a node you glue to a machine, that harvests ambient energy, learns a local model of normal behavior, and speaks up only when the thing it is watching starts to deviate.

<figure>
  <img src="/assets/img/blog/predictive-maintenance/architecture.png" alt="Left, an industrial production line with several battery-free sensor nodes in active, charging and no-power states. Right, the fan case study pipeline from vibration signal to real-time fault classification." loading="lazy" />
  <figcaption>Batteryless nodes on a production line are intermittently available (left). The case study grounds the idea on a single retrofitted vibration sensor (right).</figcaption>
</figure>

## Why this is a systems problem, not a sensing problem

Once the node is batteryless, sensing, computation, and communication stop being separable.

**Communication.** A node wakes only after it has accumulated enough energy, and the receiver may well be asleep at that moment. Holding a synchronized connection open just to report that nothing happened is exactly the wrong use of a harvested joule. We argue for event-triggered communication: transmit compact anomaly evidence when the vibration signature drifts, or when a diagnostic query asks for it. Neighbor-discovery-style schedules are a principled fit — short packets and sparse listening windows, synthesized to trade latency against energy without keeping clocks permanently in sync.

There is an open theoretical problem underneath. Deterministic neighbor-discovery theory can guarantee a beacon/reception-window coincidence within the minimum possible worst-case time, but only for a *fixed* energy budget and a rigid schedule. A harvesting node has neither: its budget changes at runtime with the light or the vibration it is scavenging. A protocol family that keeps the deterministic guarantees while letting each node vary its own budget is, we think, a key enabler.

**Computation.** Streaming raw data anywhere is usually the wrong default. The node should spend its energy on a cheap local detector first, and escalate to a more accurate model, a compact feature vector, or a consensus with its neighbors only when the cheap detector is suspicious. That turns the sensing/networking boundary into a *semantic* interface: packets carry condensed information value, not samples.

## The case study

To check that the sensing end of this is not the hard part, we taped a small accelerometer node to an ordinary pedestal fan and clipped a paperclip to one blade to mimic an imbalance.

<figure>
  <img src="/assets/img/blog/predictive-maintenance/experiment.png" alt="Photographs of an accelerometer taped to a pedestal fan, with the protective cover closed and open and a paperclip clipped to one blade, plus the colored output of the real-time classifier." loading="lazy" />
  <figcaption>(a) The sensor, taped on. (b, c) Cover open and closed, with a paperclip creating an imbalance. (d) Output of the real-time classifier.</figcaption>
</figure>

Acceleration was sampled at only about 25 Hz. We recorded roughly 1600 windows of 200 samples and trained a deliberately small classifier — an MLP with a single hidden layer of five nodes — on the FFT coefficients of one-dimensional acceleration. On about 1000 further windows held out for verification, covering the fan standing still (166), rotating with the cover closed (239), cover open (177), cover open with paperclip (168), and cover closed with paperclip (220), **every window was classified correctly.** A real-time version tracked state changes such as opening the cover correctly in the steady state.

## Making it small enough to run on harvested energy

Classifying correctly is not the interesting result; classifying correctly *cheaply* is. We down-sampled to 10 Hz and retrained on 16-sample windows:

| Model | Parameters | MACs | Accuracy |
| --- | ---: | ---: | ---: |
| Decision tree | 8 | 0 | 91.8% |
| DS-CNN | 131 | 488 | 99.3% |

That gap is the whole argument for energy-adaptive inference. An 8-node decision tree costs essentially nothing and can run continuously to flag candidates; the depthwise-separable CNN, at 488 multiply-accumulates, is invoked only when the tree is suspicious or the energy buffer allows. Once that two-stage chain fires, the node can raise its sampling rate and analyze longer windows.

## What we have not done yet

The demo is honest about its scope: **the sensor was battery-powered and the inference ran on a laptop.** What the case study establishes is a feasibility argument — a low sampling rate and a model in the hundreds-of-parameters range are sufficient for the task, which is the regime a harvesting-powered node could plausibly sustain. Actually closing the loop means running the model on the node, under intermittent power, with the asynchronous communication described above. That is the research agenda, and the paper is a statement of it rather than a finished system.

---

*Figures are taken from the accepted version of the paper and are © IEEE. The definitive version will appear in the RTCSA 2026 proceedings on IEEE Xplore; we cannot host the PDF here.*
