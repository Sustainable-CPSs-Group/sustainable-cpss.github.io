---
layout: page
permalink: /research/
title: research
description: models, algorithms and tools for sustainable cyber-physical systems
nav: true
nav_order: 1
---

Cyber-physical systems are embedded computers and software that interact with and control
physical processes — machines on an industrial production line, autonomous robots, autonomous
vehicles. Modern ones are ensembles: machine learning, feedback control, networking and
real-time components, each with its own assumptions, composed into a single system that has to
work.

That composition has become expensive. These systems consume large and growing amounts of
energy. They need constant maintenance and monitoring, and when they fail, diagnosing why is
slow and costly. Our Focus Group asks how to design them so that they are sustainable to
**build**, to **operate**, and to **maintain**.

The agenda breaks into four questions.

#### Energy-efficient and batteryless operation

How far can the energy budget of a cyber-physical system be pushed down — ideally to the point
where it needs no battery at all and runs on harvested energy? Intermittent, unpredictable power
invalidates most of the assumptions that real-time scheduling and control design rest on, so this
is not only a hardware question: it reaches into how computation and actuation are scheduled.

#### Safe autonomy with lightweight machine learning

Autonomy is increasingly delivered by machine learning components that are expensive to run and
hard to reason about. How can a system use _less_ powerful learned components and still carry a
guarantee that it operates safely? This means architectures where a lightweight learned policy is
bounded by a verifiable safety envelope, rather than trusted on its own.

#### Edge-first computing

How can these systems do most of their work on resource-constrained edge computers, and reach for
cloud resources only when strictly necessary? Every offloaded computation costs energy, latency
and a dependency on a network that may not be there. Deciding what genuinely has to leave the
device is a design-time and run-time question at once.

#### Self-adaptation and early failure warning

How can a system notice that it is running inefficiently and reconfigure itself, and how can it
warn that it is about to fail before it does? Prior warning turns unplanned downtime into
scheduled maintenance, which is where much of the lifetime cost of a production system sits.

---

The Focus Group is funded by a **Dieter Schwarz Courageous Research Grant** held by
Prof. Samarjit Chakraborty, and is hosted at TUM by the
[Chair of Integrated Systems](https://www.ce.cit.tum.de/en/lis/) (Prof. Andreas Herkersdorf) and
the [Chair of Cyber-Physical Systems in Production Engineering](https://rtsl.cps.mw.tum.de)
(Prof. Marco Caccamo). See the
[Focus Group page at the TUM Institute for Advanced Study](https://www.ias.tum.de/en/ias/research-areas/control-theory-systems-engineering-and-robotics/sustainable-cyber-physical-systems/)
for the official description.
