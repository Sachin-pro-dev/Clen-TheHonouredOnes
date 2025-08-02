# Clen 3.0: Decentralized Credit Platform on Monad

![Clen 3.0 Banner](https://via.placeholder.com/800x200/FFB3E6/FFFFFF?text=Clen+3.0+Decentralized+Credit+Platform)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Monad Network](https://img.shields.io/badge/blockchain-Monad-purple.svg)](https://monad.xyz/)

> A decentralized credit platform that empowers users with programmable credit via NFT spend cards and builds a transparent, Web3-native credit score.

---

## 📖 Table of Contents

- [🚀 Project Overview](#-project-overview)
  - [Core Concept](#core-concept)
  - [Key Features](#key-features)
- [🛠️ Technical Architecture](#️-technical-architecture)
  - [Technology Stack](#technology-stack)
  - [Network Configuration](#network-configuration)
  - [Smart Contract Structure](#smart-contract-structure)
- [✨ Design & User Experience](#-design--user-experience)
  - [Design Philosophy](#design-philosophy)
- [👥 Team](#-team)
- [⚙️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [📄 License](#-license)

---

## 🚀 Project Overview

Clen 3.0 stands at the intersection of **DeFi**, **identity**, and **inclusive finance**. Our platform is building the future of decentralized credit, enabling anyone to establish a verifiable credit identity, access spendable capital via NFT cards, and earn trust through transparent, real-time, and privacy-preserving systems.

### Core Concept

Clen 3.0 is a decentralized credit platform built on the **Monad Network**. It allows users to access programmable credit through NFT spend cards and cultivate a Web3-native credit score.

#### 🔐 Privacy-First Onboarding
- **Zero-Knowledge (ZK) proofs** for government-issued ID verification (Aadhaar, Passport)
- ZK-proof anchored on **Ethereum mainnet** for security
- Web3 wallets serve as on-chain financial identity

#### 💳 NFT-Based Credit Cards
- Spend cards denominated in **stablecoins** (USDT)
- **2x spend multiplier** (₹1000 deposit → ₹2000 spend limit)
- **Joining bonus** of ₹1000 per card
- Time-bound validity with repayment schedules

#### 📊 Web3 Credit Scoring
- Tracks repayment history, transaction patterns, and usage
- **Web3 CIBIL score** - decentralized alternative to traditional credit scores
- Transparent, globally portable, and user-owned
- Continuously updated on-chain

#### 💰 Economic Model
- **12% commission** on merchant transactions (10% user incentives, 2% operations)
- **1-1.5% transaction fee**
- **CT tokens** for rewards, refunds, and platform participation
- **80% refund** for unused expired cards in CT tokens

### Key Features

| Feature | Description |
|---------|-------------|
| 🎯 **NFT Spend Cards** | Programmable credit through unique, time-bound NFT cards |
| ⚡ **Credit Multiplier** | Enhanced spending power (2x deposit + joining bonus) |
| 📈 **Web3 CIBIL Score** | Transparent, on-chain credit reputation based on user behavior |
| 🚫 **Blacklist System** | Automated penalties for defaults, promoting responsible usage |
| 🪙 **CT Tokens** | Native utility token for rewards, refunds, and platform participation |
| 📋 **Transaction Analytics** | Tools for users to track and understand their financial activity |
| 🤖 **AI Assistant** | Conversational AI for financial advice and platform guidance |

---

## 🛠️ Technical Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js with TypeScript |
| **Smart Contracts** | Solidity |
| **Development Framework** | Hardhat |
| **Blockchain Interaction** | Ethers.js, Wagmi, RainbowKit |
| **Blockchain Network** | Monad Network |
| **Token Standards** | ERC-721 (NFT Cards), ERC-20 (CT Tokens) |
| **Styling** | Tailwind CSS |
| **Build Tool** | Vite |

### Network Configuration

| Environment | Chain ID | RPC URL | Status |
|-------------|----------|---------|--------|
| **Hardhat Local** | 31337 | `http://localhost:8545` | ✅ Active |
| **Monad Testnet** | 41454 | `https://testnet-rpc.monad.xyz` | ✅ Active |
| **Monad Mainnet** | 60808 | `https://rpc.monad.xyz` | 🔄 Future |

### Smart Contract Structure

#### 📋 Core Contracts

##### 1. `ClenNFTCard.sol`
Manages the minting, spending, expiry, and burning of NFT spend cards.

```solidity
struct Card {
    uint256 depositAmount;
    uint256 spendingLimit;
    uint256 validityPeriod;
    uint8 tier;
    bool isActive;
    bool isBlacklisted;
}

struct RepaymentSchedule {
    uint256 totalDue;
    uint256 monthlyEMI;
    uint256 nextDueDate;
    uint256 interestRate;
    uint256 missedPayments;
}
```

##### 2. `ClenCreditScore.sol`
Handles the calculation and management of user credit scores.

```solidity
struct CreditProfile {
    uint256 score;
    uint256 totalTransactions;
    uint256 onTimePayments;
    uint256 latePayments;
    uint256 defaults;
    uint256 totalSpent;
    uint256 avgRepaymentTime;
}
```

**Score Calculation Weights:**
- `REPAYMENT_WEIGHT`: 40%
- `TRANSACTION_WEIGHT`: 30%
- `MERCHANT_WEIGHT`: 20%
- `DEFAULT_PENALTY`: -50 points

##### 3. `ClenRewards.sol`
Manages the distribution and redemption of CT tokens.

```solidity
struct RewardConfig {
    uint256 joiningBonus;
    uint256 cashbackRate;
    uint256 ctTokenReward;
    uint256 loyaltyMultiplier;
}
```

---

## ✨ Design & User Experience

The Clen 3.0 frontend is meticulously designed to offer a modern, intuitive, and visually appealing Web3 banking experience.

### Design Philosophy

#### 🎨 Theme: Modern Web3 Banking with Pastel Aesthetics

| Element | Design Choice |
|---------|---------------|
| **Color Palette** | Soft pastels (lavender, mint green, peach, sky blue, cream) |
| **Background** | Subtle gradients and light backgrounds |
| **Typography** | Clean, friendly fonts with rounded edges |
| **Interactions** | Smooth animations, gentle hover effects, micro-interactions |
| **Layout** | Card-based design with rounded corners and soft shadows |
| **Icons** | Outlined style with pastel fills |
| **Buttons** | Rounded, gradient backgrounds with gentle hover animations |

---

## 👥 Team

### The Honoured Ones

| Name | Role |
|------|------|
| **Sachin Baluragi** | Lead Developer |
| **Rahul Jadvani** | Smart Contract Developer |
| **Sai Jadhav** | Frontend Developer |

---

## ⚙️ Getting Started

To set up and run the Clen 3.0 MVP locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18 or higher
- **npm**: Latest version (comes with Node.js)
- **Git**: For cloning the repository

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sachin-pro-dev/Clen-TheHonouredOnes.git
   cd pastel-credit-mint
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local Hardhat network:**
   Open a new terminal and run:
   ```bash
   npx hardhat node
   ```
   This will start a local blockchain for development.

4. **Deploy smart contracts to the local network:**
   In another terminal, run:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
   > **Note:** You'll need to create a `scripts/deploy.js` file based on your smart contract setup if it doesn't exist.

5. **Start the frontend development server:**
   In a third terminal, run:
   ```bash
   npm run dev
   ```

6. **Access the application:**
   Once the development server starts, the application will be accessible at:
   ```
   http://localhost:5173
   ```

### 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start local blockchain
npx hardhat node

# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Build for production
npm run build

# Run tests
npm test
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built with ❤️ by The Honoured Ones</strong><br>
  <em>Empowering the future of decentralized finance</em>
</p>