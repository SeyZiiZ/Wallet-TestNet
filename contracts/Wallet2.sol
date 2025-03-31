// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "hardhat/console.sol";

contract Wallet2 {

    address public owner;

    mapping(address => uint) private Wallets;
    mapping(address => bool) public isWhitelisted;

    event MoneyDeposited(address indexed from, uint amount);
    event MoneyWithdrawn(address indexed to, uint amount);
    event MoneyTransferred(address indexed from, address indexed to, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Pas le proprietaire");
        _;
    }

    modifier onlyWhitelisted() {
        require(isWhitelisted[msg.sender], "Non autorise");
        _;
    }

    constructor() {
        owner = msg.sender;
        isWhitelisted[owner] = true;
    }

    function whitelistUser(address _user) external onlyOwner {
        isWhitelisted[_user] = true;
    }

    function removeWhitelistUser(address _user) external onlyOwner {
        isWhitelisted[_user] = false;
    }

    receive() external payable onlyWhitelisted {
        Wallets[msg.sender] += msg.value;
        emit MoneyDeposited(msg.sender, msg.value);
    }

    fallback() external payable {}

    function withdrawMoney(address payable _to, uint _amount) external onlyWhitelisted {
        require(_amount <= Wallets[msg.sender], "Fonds insuffisants");
        Wallets[msg.sender] -= _amount;
        _to.transfer(_amount);
        emit MoneyWithdrawn(_to, _amount);
    }

    function transferTo(address _recipient, uint _amount) external onlyWhitelisted {
        require(Wallets[msg.sender] >= _amount, "Fonds insuffisants");
        Wallets[msg.sender] -= _amount;
        Wallets[_recipient] += _amount;
        emit MoneyTransferred(msg.sender, _recipient, _amount);
    }

    function getBalance() external view onlyWhitelisted returns (uint) {
        return Wallets[msg.sender];
    }

    function getUserBalance(address _user) external view onlyOwner returns (uint) {
        return Wallets[_user];
    }
}