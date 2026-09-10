---
title: Research
description: Batteryless sensing, low-power wireless communication, and AI-assisted diagnostics for industrial systems.
areas:
  - title: Batteryless industrial sensing
    description: We study how harvested energy and lightweight local inference could support machine monitoring without routine battery replacement.
  - title: Low-power wireless and BLE
    description: Our BLE work connects application timing requirements with radio energy use. We also investigate communication when nodes wake independently and lose power.
  - title: Coordinated sensor networks
    description: We aim to schedule transmissions across many sensors, accounting for available energy and giving urgent measurements timely access to the radio channel.
  - title: AI-assisted diagnostics
    description: We investigate how AI could combine sensor evidence with engineers’ questions and adapt sensing and communication within explicit operating rules.
---

Monitoring a machine should not create another system that needs frequent maintenance. We investigate how externally attached sensors could help detect wear, diagnose faults, and support maintenance decisions while keeping their own energy use and servicing needs low.

Our current work on low-power communication and anomaly detection contributes to a longer-term goal: a dense network of batteryless sensors that can change what it measures and reports according to the task. Routine monitoring may need only occasional summaries; an unusual vibration or an engineer’s question may call for detailed readings from a few nearby sensors.

## Batteryless industrial sensing

Harvesting energy from light or vibration could allow sensors to operate without replacing batteries. Available energy varies, however, and a device may lose power during a computation or wake while its receiver is asleep. Sensing, local inference, and communication must fit within the same limited energy budget.

We study lightweight models that detect unusual behaviour close to the sensor. Sending a short summary or an anomaly report instead of a continuous stream of raw measurements could reduce radio use. The challenge is to retain enough information for a reliable diagnosis.

Our [predictive-maintenance case study](/blog/2026/predictive-maintenance-without-maintenance/) examines vibration sensing and small learning models for this setting. Its experiments use a battery-powered sensor and run inference on a laptop; a complete batteryless monitoring system remains a research goal.

## Bluetooth Low Energy and predictable communication

Bluetooth Low Energy (BLE) is an explicit part of our communication research. We study how application timing requirements can guide radio configuration, so a device spends less energy communicating while delivering data within the time the application allows.

Our [work on BLE communication for federated reactors](/blog/2026/ble-federated-reactors/) uses a link’s latency budget to select its connection interval. For a representative monitoring link, the power model predicts about 7.5× lower average power than using the minimum interval, while meeting the same latency budget under the model’s assumptions. This is a modelled power comparison, not a measured reduction for a complete sensor network.

Intermittent power introduces a further question: when is maintaining or restoring a connection worthwhile, and when would connectionless reporting use less energy? The proposed networking work considers BLE alongside technologies such as Zigbee and LoRa. Their different transmission and listening costs matter when choosing schedules, acknowledgements, and relays.

The proposed programme brings together three directions described below.

## Connectionless reporting

The first direction concerns sensors that initiate a report when they have useful data and enough energy. Without a persistent connection or synchronised clocks, the sender’s transmissions may miss the receiver’s listening windows. Repeated attempts cost energy, and nearby senders can collide.

We plan to use **Coverage Maps** to reason about which relative timings between a sender and receiver allow a packet to arrive. The aim is to design transmission and listening schedules with predictable delivery times for a given energy budget, then extend them to changing energy availability and multiple senders. We will also examine when acknowledgements and information about recent channel use can avoid unnecessary transmissions.

## Coordinated wake-up and channel access

The second direction places more coordination at a server with a stable power supply. A low-power wake-up receiver would let a sensor keep its main radio off until it receives an addressed instruction specifying when, on which channel, and at what power to transmit. A sensor without enough harvested energy would wait for another opportunity.

We plan to use **Grant Maps** to describe the transmission opportunities offered to each sensor and analyse access delays under stated energy and interference assumptions. The scheduler would account for missed opportunities and changing channel conditions, while balancing routine monitoring with urgent traffic.

For example, an anomaly report could trigger extra transmission opportunities for the reporting sensor and its neighbours. An engineer investigating a particular machine could request the same focused monitoring. The research question is how to respond quickly while maintaining service for the rest of the network.

## AI-assisted diagnostics with human input

The third direction investigates an AI agent that combines local anomaly reports, measurement history, network conditions, and engineers’ questions. It would help decide which additional measurements are useful and translate that decision into changes to sampling rates and communication schedules.

We propose combining learned models with explicit, checkable rules. Before a plan is executed, symbolic checks would assess constraints such as minimum sensing coverage, resource limits, and when to escalate an uncertain diagnosis to a person. Evaluating these checks and their limits is part of the research.

Human expertise is central to this approach. An operator could request measurements, confirm or correct an alert, and explain an observation through a mobile or augmented-reality interface. We plan to investigate how that feedback can improve both diagnosis and the network’s choice of what to measure next.

## Evaluation and next steps

The proposed evaluation combines hardware measurements, controlled energy traces, and simulation. It includes wake-up receivers with sub-GHz data radios, comparisons with LoRa-class and IEEE 802.15.4-class systems, and BLE advertising as an intermittent communication baseline. Physical testbeds would establish realistic energy and interference behaviour; simulation would explore larger networks.

We aim to measure energy per delivered report, delivery delay, reliability, and fairness between sensors, alongside diagnostic accuracy and time to diagnosis. The full adaptive network, its deployment at scale, and the release of associated tools and datasets are planned outcomes. Our [publications](/publications/) and [research updates](/blog/) describe the results available so far.

---

The group is funded by a **Dieter Schwarz Courageous Research Grant** and hosted at the Technical University of Munich. Further information is available on the [Focus Group page at the TUM Institute for Advanced Study](https://www.ias.tum.de/en/ias/research-areas/control-theory-systems-engineering-and-robotics/sustainable-cyber-physical-systems/).
