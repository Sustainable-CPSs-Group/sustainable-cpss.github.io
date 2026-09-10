---
title: Research
description: We study energy use, safety, and maintenance in embedded systems that interact with the physical world.
---

An industrial machine or autonomous robot depends on several kinds of software working together. Control loops need timely sensor readings, learning models need computing resources, and distributed components need to exchange data. The choices made for one component affect the energy use and reliability of the whole system.

Our research asks how to meet these requirements with fewer resources and less maintenance. We work on four related areas.

## Energy-efficient and batteryless operation

Harvesting energy from light, vibration, or other ambient sources could allow sensing devices to operate without battery replacements. The difficulty is that the available power varies. A device may lose power during a computation, or wake up when the node it needs to contact is asleep.

We study how scheduling, control, and communication can accommodate these interruptions. Our recent [work on Bluetooth Low Energy](/blog/2026/ble-federated-reactors/) uses a link’s latency budget to choose its connection interval. For a representative condition-monitoring link, the power model predicts a reduction of about 7.5× compared with the minimum connection interval, while meeting the same latency budget under the model’s assumptions.

Our [predictive-maintenance case study](/blog/2026/predictive-maintenance-without-maintenance/) examines the sensing and computation needed by a batteryless monitoring node. It also identifies the communication challenges that remain when both ends of a link depend on harvested energy.

## Safe autonomy with lightweight machine learning

Small learning models need less memory and computation, but their use in autonomous systems raises questions about safety. We investigate architectures that combine a lightweight learned policy with mechanisms whose safety properties can be verified.

Energy availability also affects which model a device can run. A simple detector might handle routine observations, with a more accurate model used when the detector finds a possible anomaly or more energy becomes available.

## Edge-first computing

Processing data close to a sensor can reduce communication, delay, and dependence on a network connection. However, the device has limited memory, computing capacity, and energy.

We study how to divide work between the device and remote resources. This includes deciding when to transmit raw measurements, when local features or results are sufficient, and when a task warrants offloading.

## Self-adaptation and early failure warning

A system’s operating conditions change as components wear and workloads vary. Detecting these changes early could help operators schedule maintenance and allow the system to adjust its own operation.

We investigate how to obtain useful observations and use them to detect degradation and guide reconfiguration. In industrial settings, the sensors and communication needed for monitoring must also be affordable to install and maintain.

---

See our [publications](/publications/) for research papers and our [updates](/blog/) for discussions of individual results.

The group is funded by a **Dieter Schwarz Courageous Research Grant** and hosted at the Technical University of Munich. Further information is available on the [Focus Group page at the TUM Institute for Advanced Study](https://www.ias.tum.de/en/ias/research-areas/control-theory-systems-engineering-and-robotics/sustainable-cyber-physical-systems/).
