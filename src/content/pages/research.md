---
title: Research agenda
description: Four connected questions for cyber-physical systems that are sustainable to build, operate, and maintain.
---

Cyber-physical systems are embedded computers and software that interact with and control physical processes — machines on an industrial production line, autonomous robots, autonomous vehicles. Modern ones are ensembles: machine learning, feedback control, networking, and real-time components, each with its own assumptions, composed into a single system that has to work.

That composition has become expensive. These systems consume large and growing amounts of energy. They need constant maintenance and monitoring, and when they fail, diagnosing why is slow and costly. Our Focus Group asks how to design them so that they are sustainable to **build**, to **operate**, and to **maintain**.

## Energy-efficient and batteryless operation

How far can the energy budget of a cyber-physical system be pushed down — ideally to the point where it needs no battery at all and runs on harvested energy? Intermittent, unpredictable power invalidates most of the assumptions that real-time scheduling and control design rest on, so this is not only a hardware question: it reaches into how computation and actuation are scheduled, and into how nodes find each other on the air at all when neither can promise to be awake.

Two recent results sit here. We showed that choosing a Bluetooth Low Energy connection interval from a stated latency budget, rather than from the protocol minimum, cuts radio power by roughly 7.5× on a representative condition-monitoring link — [without giving up the timing guarantee](/blog/2026/ble-federated-reactors/). And we argued that [a predictive-maintenance sensor should not need its own battery changed](/blog/2026/predictive-maintenance-without-maintenance/), which turns communication into an asynchronous, energy-budgeted discovery problem.

## Safe autonomy with lightweight machine learning

Autonomy is increasingly delivered by machine learning components that are expensive to run and hard to reason about. How can a system use *less* powerful learned components and still carry a guarantee that it operates safely? This means architectures where a lightweight learned policy is bounded by a verifiable safety envelope, rather than trusted on its own — and, on a harvesting-powered node, a cascade in which a near-free detector decides when it is worth spending energy on an accurate one.

## Edge-first computing

How can these systems do most of their work on resource-constrained edge computers, and reach for cloud resources only when strictly necessary? Every offloaded computation costs energy, latency, and a dependency on a network that may not be there. Deciding what genuinely has to leave the device is a design-time and run-time question at once. It also changes what a packet is for: on a constrained node, packets should carry condensed evidence, not raw samples.

## Self-adaptation and early failure warning

How can a system notice that it is running inefficiently and reconfigure itself, and how can it warn that it is about to fail before it does? Prior warning turns unplanned downtime into scheduled maintenance, which is where much of the lifetime cost of a production system sits. The obstacle is rarely detection accuracy in the lab; it is getting dense enough observations from the factory floor in the first place, cheaply enough that the sensing layer does not become the new maintenance burden.

---

Work from these directions appears on the [publications page](/publications/), and we write up individual results in [updates](/blog/).

The Focus Group is funded by a **Dieter Schwarz Courageous Research Grant** and hosted at the Technical University of Munich. See the [official Focus Group page at the TUM Institute for Advanced Study](https://www.ias.tum.de/en/ias/research-areas/control-theory-systems-engineering-and-robotics/sustainable-cyber-physical-systems/) for the institutional description.
