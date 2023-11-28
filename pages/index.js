import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "Imran Khan",
    age: "30",
    state: "Karnataka",
    country: "India",
    fatherName: "Mohammed Khan",
    occupation: "Teacher",
  });
  const [transactionStatus, setTransactionStatus] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const rawBalance = await atm.getBalance();
      const formattedBalance = ethers.utils.formatEther(rawBalance);
      const integerBalance = Math.floor(parseFloat(formattedBalance));
      setBalance(integerBalance);
    }
  };

  const deposit = async () => {
    if (atm && depositAmount) {
      const amountInWei = ethers.utils.parseEther(depositAmount);
      try {
        let tx = await atm.deposit(amountInWei);
        setTransactionStatus(`Deposit successful. Transaction hash: ${tx.hash}`);
        await tx.wait();
        getBalance();
        setDepositAmount("");
      } catch (error) {
        setTransactionStatus(`Deposit failed: ${error.message}`);
      }
    }
  };

  const withdraw = async () => {
    if (atm && withdrawAmount) {
      const amountInWei = ethers.utils.parseEther(withdrawAmount);
      try {
        let tx = await atm.withdraw(amountInWei);
        setTransactionStatus(`Withdrawal successful. Transaction hash: ${tx.hash}`);
        await tx.wait();
        getBalance();
        setWithdrawAmount("");
      } catch (error) {
        setTransactionStatus(`Withdrawal failed: ${error.message}`);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="container">
        <div className="account-info section">
          <h2>Account Information</h2>
          <p>Your Account: {account}</p>
          <p>Name: {userDetails.name}</p>
          <p>Age: {userDetails.age}</p>
          <p>State: {userDetails.state}</p>
          <p>Country: {userDetails.country}</p>
          <p>Father's Name: {userDetails.fatherName}</p>
          <p>Occupation: {userDetails.occupation}</p>
        </div>

        <div className="actions-container">
          <div className="deposit section">
            <h2>Deposit Section</h2>
            <input
              type="text"
              placeholder="Enter deposit amount in ETH"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <button onClick={deposit}>Deposit</button>
          </div>

          <div className="withdraw section">
            <h2>Withdraw Section</h2>
            <input
              type="text"
              placeholder="Enter withdraw amount in ETH"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <button onClick={withdraw}>Withdraw</button>
          </div>

          <div className="balance section">
            <h2>Balance Section</h2>
            <button onClick={getBalance}>Check Balance</button>
            {balance && <p>Your Balance: {balance} ETH</p>}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main>
      <header>
        <h1>Welcome Imran khan</h1>
      </header>
      {initUser()}
      {transactionStatus && <p>Transaction Status: {transactionStatus}</p>}
      <style jsx>{`
        main {
          background-color: yellow;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .section {
          border: 1px solid black;
          padding: 10px;
          margin-bottom: 10px;
        }

        input {
          margin-bottom: 10px;
        }

        button {
          margin-top: 10px;
        }
      `}</style>
    </main>
  );
}
