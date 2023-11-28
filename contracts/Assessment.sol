
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    mapping(address => uint256) public investments;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event SubtractFunds(uint256 amount);
    event InvestFunds(address investor, uint256 amount);
    event ClaimInvestment(address investor, uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        emit Withdraw(_withdrawAmount);
    }

    function subtractFunds(uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _amount, "Insufficient balance");
        balance -= _amount;
        emit SubtractFunds(_amount);
    }

    function investFunds() public payable {
        require(msg.value > 0, "Investment amount must be greater than 0");
        investments[msg.sender] += msg.value;
        balance += msg.value;
        emit InvestFunds(msg.sender, msg.value);
    }

    function claimInvestment() public {
        uint256 investmentAmount = investments[msg.sender];
        require(investmentAmount > 0, "No investment found for the sender");
        investments[msg.sender] = 0;
        payable(msg.sender).transfer(investmentAmount);
        emit ClaimInvestment(msg.sender, investmentAmount);
    }
}
