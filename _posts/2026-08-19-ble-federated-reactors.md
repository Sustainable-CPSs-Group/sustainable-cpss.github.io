---
layout: post
title: Giving federated reactors a low-power radio
date: 2026-08-19 10:00:00+0200
description: Why connection-oriented Bluetooth Low Energy is deterministic enough for Lingua Franca, and what it costs in power
tags: publications ble lingua-franca
categories:
---

Our paper **"Budget-Conditioned BLE Communication for Federated Reactors"** has been accepted to
_IEEE Embedded Systems Letters_, in the special issue for the Workshop on Time-Centric Reactive
Software (TCRS). It is joint work by Sebastiano Gaiardelli, Philipp H. Kindt and Samarjit
Chakraborty.

### The gap

[Lingua Franca](https://www.lf-lang.org/) is a coordination language for deterministic concurrent
software. Programs are built from _reactors_, triggered by logical, time-stamped events in a fixed,
statically determined order, so a program's output depends on its inputs and not on runtime
scheduling. _Federated_ reactors extend that guarantee across networked nodes.

The guarantee has a price: every link between nodes must be given a latency budget, its
**`maxwait`**, declared at design time. `maxwait` has to cover the worst-case network latency, the
time to assemble and disassemble packets, and the error introduced by clock offset and jitter at
both ends.

That is easy to state for a wire and awkward for a radio. Wireless links are usually assumed to have
no useful bound at all, so no sensible `maxwait` can be written down — and Reactor-UC, the Lingua
Franca runtime for microcontroller-class devices, consequently shipped without any low-power
wireless transport. Mobile IoT nodes, wearables and small sensors were simply hard to federate.

{% include figure.liquid path="assets/img/blog/ble-federated-reactors/overview.png" class="img-fluid rounded z-depth-1" alt="Two federates linked by a BLE NetworkChannel, and the timing of that channel" caption="Two federates linked by a BLE <code>NetworkChannel</code> (top) and the channel's timing (bottom). The <em>maxwait</em> parameter is what configures the radio." %}

### The observation

Connection-oriented BLE is not a best-effort link. It is _itself_ a time-triggered protocol: a
connection has a configurable, periodic transmit schedule — the connection interval `CI` — and it
retransmits lost packets on the next event. If you are willing to pay for a bounded number of
retransmissions in your latency budget, its timing behaviour in a controlled environment is
"deterministic with some outliers", which is exactly the contract every other Lingua Franca
transport already offers.

So the question becomes quantitative rather than philosophical: how many retransmissions do you
need, and what does the resulting `CI` cost you in power?

### How reliable is BLE, really?

Two measurements underpin the bound.

First, the physical layer. We placed two Nordic nRF54 radios about 1.5 m apart in a low-interference
environment and sent 23-byte packets over BLE's 1 Mbit/s PHY on a single channel — no channel
hopping, no retransmission. Across more than 10,000 packets, **not a single transmission error** was
detected. Range-limit bit-error figures from the specification are not what a real deployment sees.

Second, interference between BLE piconets, which is the failure mode that actually matters when a
Lingua Franca model contains several links. BLE shuffles connection events across channels, so we
simulated the current hopping algorithm over 50 million connection events.

{% include figure.liquid path="assets/img/blog/ble-federated-reactors/channel-hopping.png" class="img-fluid rounded z-depth-1" alt="Bar chart of re-collision probabilities for the BLE channel-hopping algorithm at 3, 9, 29 and 37 available channels" caption="Probability that two piconets pick the same channel 1 to 5 times in a row, for different numbers of available channels." %}

With only 3 usable channels, two piconets collide 33% of the time — but colliding five events in a
row already drops to 0.4%. With the usual 37 channels, five consecutive collisions occurred with
probability 2.4 × 10⁻⁷. A retransmission budget larger than one buys a great deal.

### What it costs

From there we derive a closed-form worst-case latency and invert it: given a `maxwait`, compute the
**largest** admissible connection interval. Larger `CI` means the radio wakes less often, so this is
the energy-optimal choice that still meets the deadline.

For a representative condition-monitoring link — `maxwait` = 250 ms, 10 ms packet handling, 5 ms
clock error, 2 ms stack overhead, no fragmentation, 3 retransmissions — the method selects
**`CI* = 57.5 ms`**, whose worst-case delay of 247 ms fits the budget. The radio then draws about
**0.44 mW instead of 3.3 mW**, which is what you would spend at the energy-naive minimum of
`CI = 7.5 ms`. That is a **7.5× reduction** for the same deadline. The saving scales with slack:
roughly 2.7× at a 100 ms `maxwait`, and around 30× at 1 s.

{% include figure.liquid path="assets/img/blog/ble-federated-reactors/power.png" class="img-fluid rounded z-depth-1" alt="Plot of maxwait and average power against connection interval, and the number of admissible transmission attempts" caption="(a) <em>maxwait</em> and average power as a function of the connection interval. (b) The number of transmission attempts <em>a</em> that still fit in a 250 ms budget, which falls in steps as CI grows." %}

Panel (b) is the part we find most useful in practice. Pushing `CI` past `CI*` does not extend the
deadline; it just spends the same budget in coarser units, so fewer attempts fit inside it. The
attempt count is an integer, so it falls in steps — four, three, two, one — and the residual
probability of a tardy message decays geometrically in that count. **Overshooting `CI*` degrades
reliability abruptly rather than gradually.** Conversely, shortening `CI` buys nothing at all until
you cross the next step.

### What this does not cover

We would rather be explicit about the boundaries:

- The bound assumes the connection interval, peripheral latency and fragmentation stay fixed for the
  life of the connection. Renegotiating them mid-flight invalidates it, which is why our transport
  fixes them when the connection opens.
- It covers a **single link**. One central serving several peripherals turns `CI` selection into a
  scheduling problem, and that is future work.
- The power figures are model-based, derived from Nordic's power profiler for an nRF52840. They
  await hardware validation.
- "Controlled environment" is doing real work in the argument. Characterizing the per-attempt
  failure probability under uncontrolled interference is on our list.

The implementation is a BLE `NetworkChannel` for Reactor-UC, built on Zephyr — as far as we know,
the first low-power wireless transport for federated Lingua Franca.

---

_Figures are taken from the accepted version of the paper and are © IEEE. The definitive version
will appear in IEEE Embedded Systems Letters on IEEE Xplore; we cannot host the PDF here._
