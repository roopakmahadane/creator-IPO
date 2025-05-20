// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import './CreatorToken.sol';
import 'hardhat/console.sol';

contract CreatorFactory {

    address[] public creatorTokens; 
    uint public constant MAX_TOKENS_PER_USER = 5;
    struct TokenData {
        address tokenAddress;
        string name;
        string symbol;
    }
    mapping(address => address[]) tokenByCreator;
    mapping(address => TokenData) public tokenMetadata;

    event tokenDeployed(address indexed creator, address indexed tokenAddress, string indexed name, string symbol);

    function createToken(string memory _name, string memory _symbol, uint _initialSupply) external{
        require(bytes(_name).length > 0, "Token name cannot be empty");
        require(bytes(_symbol).length > 0, "Token symbol cannot be empty");
        require(_initialSupply > 0, "Initial supply cannot be empty");
        require(tokenByCreator[msg.sender].length < MAX_TOKENS_PER_USER, "Token creation limit reached");
        CreatorToken newToken = new CreatorToken(msg.sender, _name, _symbol, _initialSupply);
        address tokenAddress = address(newToken);
        creatorTokens.push(tokenAddress);
        tokenByCreator[msg.sender].push(tokenAddress);
        console.log("Post-push token count:", tokenByCreator[msg.sender].length);
        tokenMetadata[tokenAddress] = TokenData(tokenAddress,_name,_symbol);
        emit tokenDeployed(msg.sender, tokenAddress, _name, _symbol);
    }

    function allTokens() public view returns(address[] memory){
        return creatorTokens;
    }

    function getTokensByCreator(address creator) public view returns (TokenData[] memory) {
    address[] memory tokens =  tokenByCreator[creator];
    TokenData[] memory allTokenData = new TokenData[](tokens.length);
    for (uint i=0; i<tokens.length; i++){
        allTokenData[i] = tokenMetadata[tokens[i]];
    }
    
    return allTokenData;
}
    
}