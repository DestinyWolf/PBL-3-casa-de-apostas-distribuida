// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "./workToken.sol";

contract BetContract {

    //enum pra definir o status da aposta
    enum Status {CLOSED, OPEN}

    //variaveis
    //address[] private bettors;
    address[] private allBettors;
    address private owner;
    address private tokenAddress;
    uint256 private opc1;
    uint256 private opc2;
    uint256 private amoutOpc1;
    uint256 private amoutOpc2;

    Status betStatus;

    //somente o dono do contrato podera chamar a funcao
    modifier isOwner{
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(address token) {
        owner = msg.sender;
        tokenAddress = token;
        betStatus = Status.OPEN;
        opc1 = 0;
        opc2 = 0;
        amoutOpc1 = 0;
        amoutOpc2 = 0;
    }

    mapping (uint => address[]) bettors;

    event Bet(address _to, address _from, uint256 _amount, uint256 opc);
    event Winners(address[] wallet, uint256 amount, uint256 result);


    function bet(uint256 amount, uint256 opc) public returns(bool) {
        require(betStatus == Status.OPEN, "bet closed");
        require(amount == 500, "bet amount must be 500");
        if (opc % 2 == 0) {
            opc1 += 1;
            amoutOpc1 += amount;
            bettors[opc].push(msg.sender);
        } else {
            opc2 += 1;
            amoutOpc2 += amount;
            bettors[opc].push(msg.sender);
        }
        WorkToken(tokenAddress).transferFrom(msg.sender, address(this), amount); //recolhe o dinheiro da pessoa
        allBettors.push(msg.sender);
        emit Bet(msg.sender, address(this), amount, opc);
        return true;
    }

    function CalcOdd() public view returns(uint256[] memory) {
        return odds;
    }

    function giftWinners() public isOwner returns (bool) {
        require(betStatus == Status.OPEN, "bet closed");
        uint number = random() % 2;
        uint balance = WorkToken(tokenAddress).balanceOf(address(this)); //valor armazenado no contrato
        //memory address[] winner = bettors[number];

        uint256 amoutForUser = balance / (number == 0 ? opc1 : opc2);
        for(uint256 i = 0; i< bettors[number].length; i++) {
            WorkToken(tokenAddress).transfer(bettors[number][i], amoutForUser);
        }
        //WorkToken(tokenAddress).transfer(winner, balance); // envia pra pessoa o dinheiro pra quem ganhou 
        emit Winners(bettors[number], balance, number);

        return true;
    }

    function getValueGift() public view returns(uint256) {
        require(betStatus == Status.OPEN, "bet closed");
        return WorkToken(tokenAddress).balanceOf(address(this));
    }

    function getPlayers() public view returns(address[] memory) {
        return allBettors;
    }

    function statusClose() public isOwner {
        betStatus = Status.CLOSED;
    }

    function statusOpen() public isOwner {
        betStatus = Status.OPEN;
    }

    function getStatusBet() public view returns(Status) {
        return betStatus;
    }
    //gera um numero aleatorio
    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, allBettors)));
    }
}
