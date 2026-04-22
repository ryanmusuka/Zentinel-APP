# 🛡️ Zentinel: The Future of Digital Traffic Enforcement

**Redefining law enforcement through AI, offline-first reliability, and departmental synergy.** 

Zentinel is a high-performance, mission-critical web application designed for the **Zimbabwe Republic Police (ZRP)**. It digitizes the roadside ticketing process to eliminate administrative "leakage," reduce paper waste, and enhance public safety. Built with a focus on the **Road Traffic Act [Chapter 13:11]**, Zentinel serves as a secure bridge between the ZRP and **ZINARA**, ensuring that vehicle violations, roadworthiness, and habitual offenders are tracked with surgical precision.

---

## 🏗️ The Tech Stack
I selected this stack to prioritize extreme reliability, data integrity, and lightning-fast performance in low-bandwidth environments.

* **Framework:** Next.js (App Router) – Leveraging Server Components for secure, server-side logic and optimal performance.
* **Language:** TypeScript – Enforcing strict type-safety to prevent runtime errors in sensitive enforcement data.
* **Styling:** Tailwind CSS & shadcn/ui – Clean, "industrial-grade" UI designed for high visibility in various outdoor lighting conditions.
* **Database & Auth:** Supabase (PostgreSQL) – Providing real-time data syncing and robust authentication.
* **Backend Logic:** Supabase Edge Functions & Row Level Security (RLS).
* **Offline Support:** Service Workers (PWA) – Enabling the "Graceful Offline" protocol for remote roadblocks.

---

## ✨ System Features & Development Progress

The system is being rolled out in phases. Below is the current status of the core modules:

| Module | Feature | Status | Description |
| :--- | :--- | :--- | :--- |
| **Authentication** | Secure Rank-Based Login | ✅ Complete | Multi-tier access for Constables vs. Inspectors. |
| **Enforcement** | Digital Inspection Checklist | ✅ Complete | Roadworthy tracking (Fire extinguishers, reflectors, etc.). |
| **AI Engine** | AI Legal Inference | 🚧 In Progress | Background agent trained on the Road Traffic Act to suggest fines. |
| **Verification** | Biometric Driver Scan | 🚧 In Progress | Fingerprint/Face ID verification for driver's license validation. |
| **Integration** | ZINARA / ZRP Sync | 📅 Planned | Official API handshake for real-time warrant and registration checks. |
| **Documentation** | Ticket PDF Generation | 📅 Planned | Automated generation of digitally signed citations. |

---

## 🔒 Security & Sensitivity
Given the sensitive nature of law enforcement data, Zentinel is built with a "Security-First" philosophy:

* **Row-Level Security (RLS):** Officers can only access data relevant to their current shift and jurisdiction. Sensitive "Inspector-level" logs are shielded from standard accounts.
* **Immutable Audit Logs:** Every VRN lookup and ticket issuance is logged to a non-deletable table to prevent bribery and abuse of power.
* **Encrypted Sync:** Data cached during "Offline Mode" is encrypted at rest using AES-256 before being synced to the cloud.
* **Input Sanitization:** Strict validation on VRNs and Force IDs to prevent injection attacks.

---

## 🧠 Engineering Trade-offs & Lessons

### The "Graceful Offline" Protocol
Zimbabwe’s network infrastructure varies wildly. I chose a **Service Worker-based PWA architecture** over a standard web app. This allows officers to "issue" a ticket in a dead zone. The app stores the ticket in indexedDB and uses a background sync process to push the data to the ZRP servers the moment a 4G/LTE signal is regained.

### AI Human-in-the-Loop
To avoid legal liability, the AI does not *issue* the ticket. It acts as a **Legal Co-pilot**. It analyzes the violation (e.g., "No spare wheel") and pulls the relevant clause from **Statutory Instrument 129 of 2015**. The officer must verify this before the ticket is finalized, ensuring the human remains the legal authority.

### Data Privacy & DSAs
A major challenge was architecting how ZRP and ZINARA share data. We implemented a **Scoped Data Access** model: ZRP can pull "Registration Status" from ZINARA, but cannot see a citizen's insurance premium history, maintaining a strict "Need to Know" basis.

---

## 📄 License
This project is proprietary and intended for the Zimbabwe Republic Police digital transformation initiative.
