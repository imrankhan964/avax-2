# Assessment Smart Contract and React Frontend

This repository contains a simple decentralized application (DApp) that leverages the Ethereum blockchain for a basic assessment scenario. The project is divided into two main parts:

1. **Smart Contract (Solidity):**
   - The smart contract is written in Solidity, a language for writing smart contracts on the Ethereum blockchain.
   - It includes functionalities for managing an account balance, depositing and withdrawing funds, and tracking investments.
   - The smart contract also emits events for key actions such as deposits, withdrawals, subtracting funds, investing funds, and claiming investments.

2. **React Frontend:**
   - The React frontend serves as the user interface for interacting with the smart contract.
   - It uses the ethers.js library to connect to the Ethereum blockchain via the user's MetaMask wallet.
   - Users can connect their MetaMask wallet, view account information, deposit and withdraw funds, and check their account balance.

## Smart Contract

### Assessment.sol

- **Contract Name:** Assessment
- **Constructor:** Initializes the contract with an owner and an initial balance.
- **Functions:**
  - `getBalance`: Retrieves the current contract balance.
  - `deposit`: Allows the owner to deposit funds into the contract.
  - `withdraw`: Allows the owner to withdraw funds from the contract.
  - `subtractFunds`: Allows the owner to subtract funds from the contract.
  - `investFunds`: Allows users to invest funds into the contract.
  - `claimInvestment`: Allows users to claim their investments.

## React Frontend

### HomePage.js

- **Components:**
  - `initUser`: Manages the UI for connecting MetaMask, displaying account information, and providing actions like deposit, withdraw, and balance checking.
- **Hooks:**
  - `useState`: Manages state variables such as `ethWallet`, `account`, `atm`, `balance`, `withdrawAmount`, `depositAmount`, `userDetails`, and `transactionStatus`.
  - `useEffect`: Connects the MetaMask wallet when the component mounts.
- **Functions:**
  - `getWallet`: Retrieves and sets the MetaMask wallet.
  - `handleAccount`: Manages the connected Ethereum account.
  - `connectAccount`: Connects the MetaMask wallet and initializes the ATM contract.
  - `getATMContract`: Creates an instance of the ATM contract using ethers.js.
  - `getBalance`: Retrieves and sets the account balance.
  - `deposit`: Handles the deposit action, updating the contract and UI accordingly.
  - `withdraw`: Handles the withdrawal action, updating the contract and UI accordingly.

## How to Use

1. **Smart Contract:**
   - Deploy the `Assessment.sol` smart contract on the Ethereum blockchain.
   - Set the contract address in the React frontend (`contractAddress` variable).

2. **React Frontend:**

After cloning the github, you will want to do the following to get the code running on your computer.

Inside the project directory, in the terminal type: npm i

Open two additional terminals in your VS code

In the second terminal type: npx hardhat node

In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js

Back in the first terminal, type npm run dev to launch the front-end.

## author 

imrankhan

imrankhan924738@gmail.com
