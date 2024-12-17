// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./aposta.sol";
import "./workToken.sol";

contract DistributedBet {


    //varaveis
    mapping(address => BetContract) private bets;
    address private owner;
    address private tokenAddress;
    BetContract[] private allBets;

    constructor(address token){
        tokenAddress = token;
        owner = msg.sender;
    }

    event NewBet(address indexed owner);

    function newBet() public returns(bool){
        bets[msg.sender] = new BetContract(tokenAddress, msg.sender);
        allBets.push(bets[msg.sender]);
        emit NewBet(msg.sender);
        return true;
    }

    function payABet(address _owner, uint256 value, uint256 opc) public returns(bool){
        bets[_owner].bet(msg.sender, value, opc);
        return true;
    }

    function betOdd(address _owner) public view returns(uint256[] memory){
        return bets[_owner].CalcOdd();
    }

    function endBet(address _owner) public returns(bool){
        bets[_owner].giftWinners(msg.sender);
        return true;
    }

    function getBetAddress(address _owner) public view returns(BetContract) {
        return bets[_owner];
    }

    function showBetGift(address _owner) public view returns(uint256) {
        return bets[_owner].getValueGift();
    }

    function getAllBets() public view returns(BetContract[] memory) {
        return allBets;
    }
}