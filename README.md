# 🌱 DeESG

Decentralised ESG Evaluation using IoT and AI Clustering with Incentivised Green Token (GTK)

## ❓ What is ESG?

ESG is a way of assessing companies and investments to see if they reach certain standards of sustainability. ESG is an abbreviation for _environmental_, _social_, and _governance_.

## 📌 Problem Statement

1. Current ESG evaluations are potentially biased, as scores may be manipulated by organisations to appear better than they are, aimed at attracting more funding and investments.
2. There’s not enough data to train AI models. Plus, current ESG evaluation relies heavily on self-reported data. More trustworthy data is needed to train AI models for ESG rating.
3. Companies are not incentivised enough to improve or maintain their ESG scores, which hinders positive environmental impact.

## ✅ Solution

### 🌐 Decentralised ESG Rating System with AI and IoT

1. Leverage AI clustering method to classify company ESG risk levels and generate ESG ratings, eliminate the need for human evaluation and likelihood of human bias. To avoid a single source of AI output, we aggregate outputs from multiple AI models using Chainlink Decentralised Oracle Network (DON).
2. a. _E:_ Using IoT devices to allow trustless process for data collection, using sensors on edge devices to gather environmental data (e.g. greenhouse emissions and electricity consumption).

   b. _S, G:_ A forum thread allows all company members to participate, with upvotes/downvotes representing the company's sentiment (qualitative data), ensuring balance and reducing tampered company data (S, G). Leverage FHE (Fully Homomorphic Encryption) for anonymity.

3. _GreenToken (GTK)_ tokenomics system incentivises companies to become more sustainable and ethical, while also supporting governance in the sustainability and regenerative finance sector.

## 🚀 Features

1. _AI-powered ESG Rating System:_ Utilizes AI clustering algorithm trained from scratch to classify companies' ESG risk levels based on their ESG metrics.
2. _IoT-enabled Data Collection:_ Implements IoT devices to collect real-time environmental data from company premises.
3. _Anonymous Company Forum:_ Enables employees to participate in discussions and provide feedback confidentially and anonymously on Social (S) and Governance (G).
4. _GreenToken (GTK) Tokenomics:_ Incentivize companies with our native tokens to encourage sustainability and support the regenerative finance sector.

## 💻 Tech Stack

### Blockchain Networks

Scroll Sepolia Testnet, Polygon Amoy, Inco Rivest Testnet, Zircuit Testnet, Linea Sepolia Testnet

---

### Data Integration and Automation

_Chainlink:_

Chainlink Automation: Schedule data retrieval from IoT sensor devices.

Chainlink Functions: Perform off-chain computations (e.g., validating IoT data) and send verified results on-chain.

Chainlink Smart Contracts: Manage reward distribution and storage of verified IoT data on the blockchain.

---

### Decentralized Data Retrieval

_The Graph:_

Build customized subgraphs to index and query on-chain IoT data.

Enable efficient data feeds to the AI clustering model for ESG evaluation.

---

### Fully Homomorphic Encryption (FHE)

_Inco Protocol_

Leverage Fully Homomorphic Encryption (FHE) to enable privacy-preserving governance mechanisms.

Facilitate anonymous employee participation (comments, upvotes/downvotes) in the ESG forum.

---

### Storage

_IPFS_

Store raw IoT sensor data and metadata in a decentralized, immutable manner.
Provide accessibility to data for on-chain analysis and audits.

---

### Hardware Ledger Wallet

Withdraw our native token (GTK) from IoT Smart Wallet

---

## Smart Contract Addresses:

### Chainlink

Operator:0xb3DCb1123C23432c9a93632D808c3Ddd03069a88(sepolia)
RunJob:0x3B0E43A42Cfaa2AC75B662dc69702468B5A93Ec6(sepolia)
RunAIJob:0x33652136957dE346e0b5B0Cf04038B18B55e9D1D(sepolia)
CompanyDetails:0x101535944e89e03734d7f09A6cbF510A95139E6D(sepolia)

membernft: 0x9bb958398cc7695Dd5Ec19c3da55B71dfAEEe44e(inco)
memberfactory: 0xAc79750aB0C1555210d8a478Bd63fD830399c05d(inco)

smartwallet: 0xeFC2878dC0529f11Fd2BD1Cb78aA885E41cE94aa

DataStorage deployed to: 0xDcab8f95ffE674Fb14ca2A2a56F032709bdE4102
GreenToken deployed to: 0x85f9BA54CB1D11F9456e3258F8107263b809379B
GreenTokenDistributor deployed to: 0x9D127915418dca2B3397De1f536e397462b6DC39

AggregatedESGStorage deployed to: 0xF96Def7ec929b95A63DBfD456Cf04d22164F11a0

### Inco Smart Contract

AnonymousMessageBoard.sol: 0xdCD4D37ED647122bB02bEB38470Ab8c93bDf3c79
FactoryMessageBoard.sol: 0x55D09eC366fe1c61b6EE922236BfEECB9b025C66

## Links

1. DeESG Landing Page: 
