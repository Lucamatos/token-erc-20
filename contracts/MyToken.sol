// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyToken is IERC20 {

    mapping (address => uint256) private balances;
    mapping (address => mapping(address => uint256)) private allowances;

    uint256 constant _initialSupply = 100 * (10 ** 18);

    string public name;
    string public symbol;

    constructor (string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        balances[msg.sender] = _initialSupply;
    }
    
    function totalSupply() external pure returns (uint256) {
        return _initialSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "Transfer to the zero address is not allowed.");
        require(balances[msg.sender] >= value, "You dont have enough funds.");
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender,to,value);
        return true;
    }

    function allowance(address owner, address spender) external view returns (uint256) {
        return allowances[owner][spender];
    }

    function approve(address spender, uint256 value) external returns (bool) {
        require(spender != address(0), "Set allowance to the zero address is not allowed." );
        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;

    }


    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(to != address(0), "Transfer to the zero address is not allowed.");
        require(balances[from] >= value, "Insuficient funds.");
        require(allowances[from][msg.sender] >= value, "Transaction Failed. Value is greater than allowance or you dont have access to it.");
        allowances[from][msg.sender] -= value;
        balances[from] -= value;
        balances[to] += value;
        emit Transfer(from,to,value);
        return true;
    }
}
