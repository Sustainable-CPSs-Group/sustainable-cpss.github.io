---
title: Low-power BLE communication for federated reactors
date: 2026-08-19T10:00:00+02:00
description: Our new paper uses latency budgets to configure BLE links for Lingua Franca and reduce radio power.
tags: [publications, ble, lingua-franca]
hero: /assets/img/blog/ble-federated-reactors/overview.png
heroAlt: Two federates linked by a Bluetooth Low Energy network channel
bibliography: ble-federated-reactors.bib
---

Our paper **“Budget-Conditioned BLE Communication for Federated Reactors”** has been accepted for publication in *IEEE Embedded Systems Letters*, in the special issue for the Workshop on Time-Centric Reactive Software (TCRS) [@gaiardelli2026budget]. The authors are Sebastiano Gaiardelli, Philipp H. Kindt, and Samarjit Chakraborty.

## Communication deadlines in Lingua Franca

[Lingua Franca](https://www.lf-lang.org/) is a coordination language for deterministic concurrent software. Its programs consist of *reactors* that respond to events with logical timestamps. Their execution follows a statically determined order, so outputs do not depend on how the runtime happens to schedule concurrent work. Federated programs distribute these reactors across networked devices.

To coordinate those devices, each link needs a latency budget, declared through the **`maxwait`** parameter. This budget must account for network delay, packet handling, and clock offset and jitter at both ends.

Providing a useful latency estimate is difficult for a wireless link because packets can be lost or delayed by interference. Our work addresses this problem for Reactor-UC, the Lingua Franca runtime for microcontrollers, by adding a Bluetooth Low Energy transport.

<figure>
  <img src="/assets/img/blog/ble-federated-reactors/overview.png" alt="Two federates linked by a BLE NetworkChannel, and the timing of that channel." loading="lazy" />
  <figcaption>Two federates linked by a BLE NetworkChannel (top) and the channel's timing (bottom). The maxwait parameter configures the radio.</figcaption>
</figure>

## Using BLE’s connection schedule

A connection-oriented BLE link communicates at periodic connection events. The time between events is its connection interval, `CI`. Lost packets can be retransmitted at subsequent events.

This schedule lets us calculate a latency bound for a specified number of transmission attempts. It does not guarantee delivery under arbitrary interference: the reliability of the bound depends on the probability of exhausting those attempts. We therefore examine packet losses alongside the timing model.

The design question is how long the connection interval can be while allowing enough attempts within the application’s `maxwait` budget. Longer intervals let the radio wake less often and can reduce its average power.

## Packet losses and interference

We first measured physical-layer transmission errors using two Nordic nRF54 radios about 1.5 m apart in a low-interference environment. We sent more than 10,000 packets of 23 bytes over BLE’s 1 Mbit/s PHY on a single channel, without channel hopping or retransmission. We detected no transmission errors in this experiment. This result describes the tested conditions; it does not establish an error rate for other deployments.

We then simulated interference between BLE piconets over 50 million connection events using the channel-hopping algorithm. This captures a source of packet loss that matters when a federated program uses several wireless links.

<figure>
  <img src="/assets/img/blog/ble-federated-reactors/channel-hopping.png" alt="Bar chart of re-collision probabilities for the BLE channel-hopping algorithm at 3, 9, 29, and 37 available channels." loading="lazy" />
  <figcaption>Probability that two piconets pick the same channel one to five times in a row, for different numbers of available channels.</figcaption>
</figure>

With 3 usable channels, the probability of two piconets choosing the same channel was about 33%. The probability of five consecutive collisions was about 0.4%. With 37 channels, the corresponding probability for five consecutive collisions was $2.4 \times 10^{-7}$. These results help quantify how additional transmission attempts affect reliability.

## Choosing the connection interval

We derive a closed-form latency bound and use it to find the largest connection interval that satisfies a given `maxwait` budget and retransmission allowance. Under the power model, this interval minimises radio power while meeting the specified timing constraints.

For a representative condition-monitoring link, we use a 250 ms `maxwait` budget, 10 ms for packet handling, 5 ms of clock error, 2 ms of stack overhead, no fragmentation, and 3 retransmissions. The method selects **`CI* = 57.5 ms`**, with a calculated worst-case delay of 247 ms.

The estimated radio power is **0.44 mW**, compared with **3.3 mW** at the minimum connection interval of 7.5 ms: a reduction of about **7.5×**. The model predicts reductions of roughly 2.7× for a 100 ms budget and 30× for a 1 s budget. These are model-based estimates, not hardware power measurements.

<figure>
  <img src="/assets/img/blog/ble-federated-reactors/power.png" alt="Plot of maxwait and average power against connection interval, and the number of admissible transmission attempts." loading="lazy" />
  <figcaption>(a) maxwait and average power as a function of the connection interval. (b) The number of transmission attempts that still fit in a 250 ms budget.</figcaption>
</figure>

The number of attempts that fit within the budget changes in discrete steps. Increasing `CI` beyond `CI*` can remove an entire attempt, causing a sharp increase in the probability of a late message. Shortening the interval improves this aspect of reliability only when it leaves room for another attempt.

## Implementation and remaining work

We implemented the transport as a BLE `NetworkChannel` for Reactor-UC using Zephyr. The current analysis has several limits:

- The connection interval, peripheral latency, and fragmentation must remain fixed during the connection. The transport sets these parameters when the connection opens.
- The analysis covers a single link. Selecting intervals for a central device serving several peripherals requires additional scheduling work.
- The power estimates use Nordic’s power profiler for an nRF52840 and still need hardware validation.
- The packet-loss measurements used a controlled environment. Further experiments are needed to characterise failures under uncontrolled interference.

These limits define the next steps in evaluating the transport for practical deployments.

---

*Figures are taken from the accepted version of the paper and are © IEEE. The definitive version will appear in IEEE Embedded Systems Letters on IEEE Xplore; we cannot host the PDF here.*
