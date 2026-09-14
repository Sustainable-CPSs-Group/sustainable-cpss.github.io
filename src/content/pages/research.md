---
title: Research
description: Batteryless sensing, low-power wireless communication, and AI-assisted diagnostics for industrial systems.
areas:
  - title: Batteryless industrial sensing
    description: We study how harvested energy and lightweight local inference could support machine monitoring without routine battery replacement.
  - title: Harvesting-powered sensors
    description: We study the design of connected sensors that are fully self-sustained by harvesting their energy from the surrounding.
  - title: Low-power wireless communications
    description: Our wireless protocols designs connect application timing requirements with radio energy use under the constraints of energy harvesting and busy channels.
  - title: Coordinated sensor networks
    description: We aim to schedule transmissions across many harvesting-powered sensors, accounting for available energy and giving urgent measurements timely access to the radio channel.
  - title: AI-assisted diagnostics
    description: We investigate how AI could provide sensor evidence and adapt sensing and communication within explicit operating rules.
---

Monitoring a machine should not create another system that needs frequent maintenance itself. We therefore investigate how externally attached sensors could help detect wear, diagnose faults, and support maintenance decisions while keeping their own energy use and servicing needs low.

Our current work on low-power communication and anomaly detection contributes to a longer-term goal: a dense network of batteryless sensors that can change what it measures and reports according to the task. Routine monitoring may need only occasional summaries; an unusual vibration or an engineer’s question may call for detailed readings from a few nearby sensors.

## Batteryless industrial sensing

Harvesting energy from light or vibration could allow sensors to operate without replacing batteries. Available energy varies, however, and a device may lose power during a computation or wake while its receiver is asleep. Sensing, local inference, and communication must fit within the same limited energy budget.

We study lightweight models that detect unusual behavior close to the sensor. Sending a short summary or an anomaly report instead of a continuous stream of raw measurements could reduce radio use. The challenge is to retain enough information for a reliable diagnosis.

Our [predictive-maintenance case study](/blog/2026/predictive-maintenance-without-maintenance/) examines vibration sensing and small learning models for this setting. Its experiments use a battery-powered sensor and run inference on a laptop; a complete batteryless monitoring system remains a research goal.

## Wireless communications for energy harvesting-powered devices
In most wireless networks, devices communicate using synchronized clocks. Therefore, they obey to a common sleep/wake schedule and can sleep when not communicating. 
When devices are powered using harvesting systems, then devices operate intermittently and cannot afford maintaining a synchronized clock. Our research focuses on how the wireless communication is organized under these constraints, while at the same time minimizing the power consumption and collision probabilities. 

Intermittent power introduces a further question: when is maintaining or restoring a synchronous connection worthwhile, and when would asynchronous communication use less energy?

## Connectionless reporting

The first direction concerns sensors that initiate a report when they have useful data and enough energy. Without a persistent connection or synchronized clocks, the sender’s transmissions may miss the receiver’s listening windows. Repeated attempts cost energy, and nearby senders can collide.

We rely on **Coverage Maps** to reason about which relative timings between a sender and receiver allow a packet to arrive. The aim is to design transmission and listening schedules with predictable delivery times for a given energy budget, then extend them to changing energy availability and multiple senders. We will also examine when acknowledgements and information about recent channel use can avoid unnecessary transmissions.

## Coordinated wake-up and channel access

The second direction places more coordination at a server with a stable power supply. A low-power wake-up receiver would let a sensor keep its main radio off until it receives an addressed instruction specifying when, on which channel, and at what power to transmit. A sensor without enough harvested energy would wait for another opportunity.

We plan to use **Grant Maps** to describe the transmission opportunities offered to each sensor and analyze access delays under stated energy and interference assumptions. The scheduler would account for missed opportunities and changing channel conditions, while balancing routine monitoring with urgent traffic.

For example, an anomaly report could trigger extra transmission opportunities for the reporting sensor and its neighbors. An engineer investigating a particular machine could request the same focused monitoring. The research question is how to respond quickly while maintaining service for the rest of the network.

## AI-assisted diagnostics with human input

The third direction investigates an AI agent that combines local anomaly reports, measurement history, network conditions, and engineers’ questions. It would help decide which additional measurements are useful and translate that decision into changes to sampling rates and communication schedules.

We propose combining learned models with explicit, checkable rules. Before a plan is executed, symbolic checks would assess constraints such as minimum sensing coverage, resource limits, and when to escalate an uncertain diagnosis to a person. Evaluating these checks and their limits is part of the research.


## More on our results

 Our [publications](/publications/) and [research updates](/blog/) describe the results available so far.

---

The group is funded by a **Dieter Schwarz Courageous Research Grant** and hosted at the Technical University of Munich. Further information is available on the [Focus Group page at the TUM Institute for Advanced Study](https://www.ias.tum.de/en/ias/research-areas/control-theory-systems-engineering-and-robotics/sustainable-cyber-physical-systems/).
