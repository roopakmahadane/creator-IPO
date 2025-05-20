// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "hardhat/console.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorToken is ERC20, Ownable {
    constructor (address _owner, string memory _name, string memory _symbol, uint _initialSupply )
        ERC20(_name, _symbol)
        Ownable(_owner)
    {
        
         uint  initialSupplyWithDecimals = _initialSupply * (10**18);
         _mint(_owner, initialSupplyWithDecimals);
         _transferOwnership(_owner);
    } 
}