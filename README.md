# 🔐 Encrypted Rock-Paper-Scissors Game

A **privacy-preserving** Rock-Paper-Scissors game built with **Zama FHEVM** technology, featuring **Fully Homomorphic Encryption** for confidential on-chain gameplay. This project demonstrates the power of encrypted smart contracts in creating truly private blockchain applications.

## ✨ Key Features

- 🔒 **Confidential Moves**: Player moves are encrypted client-side before submission
- 🧮 **On-Chain Encrypted Logic**: Winner determination using homomorphic encryption
- ✅ **Verifiable Results**: Decrypt and verify outcomes without revealing moves
- 🎨 **Modern UI**: Glass morphism design with animated gradient backgrounds
- 🌐 **Multi-Network**: Deployed on Sepolia testnet and local Hardhat
- 🔐 **Zero-Knowledge**: Individual moves remain completely private

## 🏗️ Architecture

### Smart Contracts (`packages/fhevm-hardhat-template`)

- **`RockPaperScissors.sol`**: Core game contract with FHEVM integration
  - Game creation and management
  - Encrypted move submission with zero-knowledge proofs
  - Homomorphic winner determination
  - Result decryption permissions


### Frontend (`packages/site`)

- **Next.js 15** with React 19 and TypeScript
- **Tailwind CSS** with custom gradient animations
- **Glass morphism** UI design
- **MetaMask** wallet integration
- **FHEVM React** library for encryption/decryption

## 📋 Contract Information

### Deployed Contracts

| Network | Contract Address | Chain ID | Status |
|---------|------------------|----------|--------|
| **Sepolia** | `0x68278Bf0811A896C80e6e36c88e5c32BB757e5a9` | 11155111 | ✅ Active |
| **Hardhat Local** | `0xD8110135EE4beF2240132220546fd6c8dAAF8bb6` | 31337 | ✅ Active |

### Contract Functions

- `createGame()`: Create a new game
- `submitEncryptedMove(gameId, encryptedMove, inputProof)`: Submit encrypted move
- `getGame(gameId)`: Get game information
- `getNextGameId()`: Get next available game ID

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ 
- **MetaMask** browser extension
- **Sepolia ETH** (for testnet) - Get from [Sepolia Faucet](https://sepoliafaucet.com/)

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd FHEVM-RPS

# Install dependencies
npm install
```

### Environment Setup

Create `.env` file in `packages/fhevm-hardhat-template/`:

```env
# Your wallet mnemonic (12 or 24 words)
MNEMONIC="your_12_or_24_word_mnemonic_here"

# Infura API key for Sepolia
INFURA_API_KEY="your_infura_api_key_here"

# Optional: Etherscan API key for verification
ETHERSCAN_API_KEY="your_etherscan_api_key_here"
```

## 🎮 How to Play

### Option 1: Play on Sepolia Testnet (Recommended)

1. **Deploy contract to Sepolia:**
   ```bash
   cd packages/fhevm-hardhat-template
   npx hardhat deploy --network sepolia
   ```

2. **Start frontend:**
   ```bash
   npm run dev:mock
   ```

3. **Connect MetaMask to Sepolia:**
   - Network: Sepolia
   - RPC URL: `https://sepolia.infura.io/v3/YOUR_INFURA_KEY`
   - Chain ID: 11155111

4. **Play the game!** 🎯

### Option 2: Play on Local Hardhat

1. **Start Hardhat node:**
   ```bash
   npm run hardhat-node
   ```

2. **Deploy to localhost:**
   ```bash
   cd packages/fhevm-hardhat-template
   npx hardhat deploy --network localhost
   ```

3. **Start frontend:**
   ```bash
   npm run dev:mock
   ```

4. **Add Hardhat network to MetaMask:**
   - Network Name: Hardhat
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337

## 🎯 Game Flow

1. **Create Game**: Player 1 creates a new game
2. **Submit Move**: Player 1 submits encrypted move (Rock/Paper/Scissors)
3. **Join Game**: Player 2 joins and submits their encrypted move
4. **Auto-Resolve**: Contract determines winner using homomorphic encryption
5. **View Results**: Both players can decrypt and verify the result

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev:mock          # Start development server
npm run build             # Build for production

# Smart Contracts
npm run compile           # Compile contracts
npm run test              # Run tests
npm run deploy:sepolia    # Deploy to Sepolia
npm run deploy:hardhat-node # Deploy to local Hardhat

# Utilities
npm run generate-abi      # Generate ABI files
npm run hardhat-node      # Start local Hardhat node
```

### Project Structure

```
FHEVM-RPS/
├── packages/
│   ├── fhevm-hardhat-template/    # Smart contracts
│   │   ├── contracts/
│   │   │   └── RockPaperScissors.sol
│   │   ├── deploy/
│   │   └── test/
│   ├── site/                      # Frontend
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── abi/
│   └── fhevm-react/               # FHEVM React library
└── scripts/                       # Utility scripts
```

## 🛠️ Technology Stack

### Smart Contracts
- **Solidity** ^0.8.24
- **FHEVM** for homomorphic encryption
- **Hardhat** development framework
- **TypeScript** for type safety

### Frontend
- **Next.js 15** with App Router
- **React 19** with hooks
- **Tailwind CSS** for styling
- **FHEVM React** for encryption
- **Ethers.js** for blockchain interaction

### Security Features
- **Fully Homomorphic Encryption** (FHE)
- **Zero-Knowledge Proofs** for move validation
- **Client-side encryption** before submission
- **On-chain encrypted computation**

## 🔗 Links

- **Contract on Sepolia**: [Etherscan](https://sepolia.etherscan.io/address/0x68278Bf0811A896C80e6e36c88e5c32BB757e5a9)
- **Zama FHEVM Documentation**: [docs.zama.ai](https://docs.zama.ai/fhevm)
- **Sepolia Faucet**: [sepoliafaucet.com](https://sepoliafaucet.com/)

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Zama AI](https://zama.ai/) for FHEVM technology
- [FHEVM React Template](https://github.com/zama-ai/fhevm-react-template) for the foundation
- The Web3 community for inspiration and support

---

**Built with ❤️ using Zama FHEVM technology**
