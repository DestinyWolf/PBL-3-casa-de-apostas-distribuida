// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "./workToken.sol";

contract aposta {

    //enum pra definir o status da aposta
    enum Status {CLOSED, OPEN}

    //variaveis
    address[] private apostadores;
    address private winners;
    address private owner;
    address private tokenAddress;

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
    }

    event Bet(address _to, address _from, uint256 _amount);
    event Winners(address wallet, uint256 amount);


    function bet(uint256 amount) public returns(bool) {
        require(betStatus == Status.OPEN, "bet closed");
        require(amount == 500, "bet amount must be 500");
        WorkToken(tokenAddress).transferFrom(msg.sender, address(this), amount); //recolhe o dinheiro da pessoa
        apostadores.push(msg.sender);
        emit Bet(msg.sender, address(this), amount);
        return true;
    }

    function giftWinners() public isOwner returns (bool) {
        require(betStatus == Status.OPEN, "bet closed");
        uint number = random() % apostadores.length;
        uint balance = WorkToken(tokenAddress).balanceOf(address(this)); //valor armazenado no contrato
        address winner = apostadores[number];
        WorkToken(tokenAddress).transfer(winner, balance); // envia pra pessoa o dinheiro pra quem ganhou 
        emit Winners(winner, balance);

        return true;
    }

    function getValueGift() public view returns(uint256) {
        require(betStatus == Status.OPEN, "bet closed");
        return WorkToken(tokenAddress).balanceOf(address(this));
    }

    function getPlayers() public view returns(address[] memory) {
        return apostadores;
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
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, apostadores)));
    }
}
