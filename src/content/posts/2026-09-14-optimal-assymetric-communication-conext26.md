---
title: Optimal asymmetric communication protocol at ACM CoNEXT 2026 
date: 2026-09-14T10:00:00+02:00
description: News and research from the Sustainable Cyber-Physical Systems Focus Group at TUM.
tags: [neighbor-discovery,asymmetric-communication,energy-harvesting,publications]
bibliography: kindt2026asymmetric.bib
---
Our paper on optimal asymmetric communication and neighbor discovery has been accepted at ACM CoNEXT 2026.

## Optimal Asymmetric Communication and Neighbor Discovery

When two energy-constrained, wireless devices communicate without using synchronized clocks, beacons need to be sent multiple times until being received by the remote device, because devices are duty-cycled to save energy.
Schedules of transmissions and reception windows designed for this purpose that provide the theoretically best possible relation between energy consumption and latency are known for the case when the energy budgets on both sides are fixed.

The research group on sustainable CPS is investigating self-sustained devices that harvest their energy from the surrounding. The nature of such devices is that the power available on different devices is 

  i) asymmetric, i.e., different devices have different power budgets,
  ii) subject to frequent changes, e.g., when the amount of light harvested by a solar cell changes.

Therefore, a protocol for asymmetric communication must allow every device to adjust its power budget for communication autonomously at runtime. Till date, it has not been known if this
flexibility comes with an energy overhead. In other words: If every device is able to adjust its power budget online, for achieving the same discovery latency as a protocol in which power budgets are fixed,
will the energy consumption be the same or higher?

Our CoNEXT'26 publication solves this problem. We show the surprising result that an asymmetric protocol that allows every device to determine its duty-cycle autonomously at runtime can indeed achieve the same latency/energy performance as
an optimal protocol with fixed energy consumption. We also present *Ahoi*, a protocols that provides a provably optimal latency/energy performance, while allowing every device to choose among different duty-cycles and hence, power budgets.

This work makes a contribution towards self-sustained, harvesting-powered devices and a sustainable internet of things becoming a reality.
