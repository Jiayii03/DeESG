# 🌱 DeESG

Decentralised ESG Evaluation using IoT and AI Clustering with Incentivised Green Token (GTK)

## ❓ What is ESG?
ESG is a way of assessing companies and investments to see if they reach certain standards of sustainability. ESG is an abbreviation for *environmental*, *social*, and *governance*.

## 📌 Problem Statement

1. Current ESG evaluations are potentially biased, as scores may be manipulated by organisations to appear better than they are, aimed at attracting more funding and investments.
2. There’s not enough data to train AI models. Plus, current ESG evaluation relies heavily on self-reported data. More trustworthy data is needed to train AI models for ESG rating.
3. Companies are not incentivised enough to improve or maintain their ESG scores, which hinders positive environmental impact.

## ✅ Solution

### 🌐 Decentralised ESG Rating System with AI and IoT

1. Leverage AI clustering method to classify company ESG risk levels and generate ESG ratings, eliminate the need for human evaluation and likelihood of human bias. To avoid a single source of AI output, we aggregate outputs from multiple AI models using Chainlink Decentralised Oracle Network (DON).
2. a. *E:* Using IoT devices to allow trustless process for data collection, using sensors on edge devices to gather environmental data (e.g. greenhouse emissions and electricity consumption).

    b. *S, G:* A forum thread allows all company members to participate, with upvotes/downvotes representing the company's sentiment (qualitative data), ensuring balance and reducing tampered company data (S, G). Leverage FHE (Fully Homomorphic Encryption) for anonymity. 

3. *GreenToken (GTK)* tokenomics system incentivises companies to become more sustainable and ethical, while also supporting governance in the sustainability and regenerative finance sector.

## 🚀 Features

1. *AI-powered ESG Rating System:* Utilizes AI clustering algorithm trained from scratch to classify companies' ESG risk levels based on their ESG metrics.
2. *IoT-enabled Data Collection:* Implements IoT devices to collect real-time environmental data from company premises. 
3. *Anonymous Company Forum:* Enables employees to participate in discussions and provide feedback confidentially and anonymously on Social (S) and Governance (G).
4. *GreenToken (GTK) Tokenomics:* Incentivize companies with our native tokens to encourage sustainability and support the regenerative finance sector.

## 💻 Tech Stack

### Blockchain Networks

Scroll Sepolia Testnet, Polygon Amoy, Inco Rivest Testnet, Zircuit Testnet, Linea Sepolia Testnet

---

### Data Integration and Automation

*Chainlink:*

Chainlink Automation: Schedule data retrieval from IoT sensor devices.

Chainlink Functions: Perform off-chain computations (e.g., validating IoT data) and send verified results on-chain.

Chainlink Smart Contracts: Manage reward distribution and storage of verified IoT data on the blockchain.

---

### Decentralized Data Retrieval

*The Graph:*

Build customized subgraphs to index and query on-chain IoT data.

Enable efficient data feeds to the AI clustering model for ESG evaluation.

---

### Fully Homomorphic Encryption (FHE)

*Inco Protocol*

Leverage Fully Homomorphic Encryption (FHE) to enable privacy-preserving governance mechanisms.

Facilitate anonymous employee participation (comments, upvotes/downvotes) in the ESG forum.

---

### Storage

*IPFS*

Store raw IoT sensor data and metadata in a decentralized, immutable manner.
Provide accessibility to data for on-chain analysis and audits.

---

### Hardware Ledger Wallet

Withdraw our native token (GTK) from IoT Smart Wallet

---

## Smart Contract Addresses:



## Links

1. DeESG Landing Page:
2.