// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "./workToken.sol";

contract BetContract {

    //enum pra definir o status da aposta
    enum Status {CLOSED, OPEN}

    //variaveis
    address[] private allBettors;
    address private owner;
    address private tokenAddress;
    uint256 private opc1;
    uint256 private opc2;
    uint256 private amoutOpc1;
    uint256 private amoutOpc2;
    mapping (uint => address[]) bettors;
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

    
    //eventos que sao registrados na blockchain
    event Bet(address indexed _to, address _from, uint256 _amount, uint256 opc);
    event Winners(address[] indexed wallet, uint256  amount, uint256 indexed result);


    //criacao de uma aposta
    function bet(uint256 amount, uint256 opc) public returns(bool) {
        require(betStatus == Status.OPEN, "bet closed");
        require(amount == 500, "bet amount must be 500");
        require(opc == 1 || opc == 2, "opc must be 1 or 2");

        if (opc % 2 == 0) {
            opc1 += 1;
            amoutOpc1 += (amount - (amount * 5 / 100));
            bettors[opc].push(msg.sender);
        } else {
            opc2 += 1;
            amoutOpc2 += (amount - (amount * 5 / 100));
            bettors[opc].push(msg.sender);
        }
        WorkToken(tokenAddress).transferFrom(msg.sender, address(this), amount); //recolhe o dinheiro da pessoa
        WorkToken(tokenAddress).transfer(owner, amount * 5 / 100); //envia 5% para o dono do contrato
        allBettors.push(msg.sender);
        emit Bet(msg.sender, address(this), amount, opc);
        return true;
    }

    //realiza o calculo da odd
    function CalcOdd() public view returns(uint256[] memory) {
        uint256[] memory odd = new uint256[](2);
        odd[0] = amoutOpc1;
        odd[1] = amoutOpc2;
        return odd;
    }

    //sorteia os ganhadores
    function giftWinners() public isOwner returns (bool) {
        require(betStatus == Status.OPEN, "bet closed");
        uint number = random() % 2;
        uint balance = WorkToken(tokenAddress).balanceOf(address(this)); //valor armazenado no contrato

        uint256 amoutForUser = balance / (number == 0 ? opc1 : opc2); // calcula quanto cada carteira ira receber

        //caso ninguem ganhe devolve o dinheiro removendo a taxa
        if (bettors[number].length == 0){
            for(uint256 i = 0; i < allBettors.length; i++) {
                amoutForUser = balance / allBettors.length;
                WorkToken(tokenAddress).transfer(allBettors[i], amoutForUser);
            }
        }

        //transfere para cada usuario o valor que ele ganhou
        for(uint256 i = 0; i< bettors[number].length; i++) {
            WorkToken(tokenAddress).transfer(bettors[number][i], amoutForUser);
        }
        uint256 restOfMoney = WorkToken(tokenAddress).balanceOf(address(this));
        if(restOfMoney > 0){
            WorkToken(tokenAddress).transfer(owner, restOfMoney);
        }

        betStatus = Status.CLOSED;
        opc1 = 0;
        opc2 = 0;
        amoutOpc1 = 0;
        amoutOpc2 = 0;
        bettors[1] = new address[](0);
        bettors[2] = new address[](0);
        allBettors = new address[](0);
        
        //realiza a emissao do evento
        emit Winners(bettors[number], balance, number);
        return true;
    }

    //retorna o premio total ate o momento da consulta
    function getValueGift() public view returns(uint256) {
        require(betStatus == Status.OPEN, "bet closed");
        return WorkToken(tokenAddress).balanceOf(address(this));
    }

    //retorna todos os apostadores
    function getPlayers() public view returns(address[] memory) {
        return allBettors;
    }

    //fecha a aposta
    function statusClose() public isOwner {
        betStatus = Status.CLOSED;
    }

    //abre a aposta
    function statusOpen() public isOwner {
        betStatus = Status.OPEN;
    }

    //retorna o status da aposta
    function getStatusBet() public view returns(Status) {
        return betStatus;
    }
    //gera um numero aleatorio
    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, allBettors)));
    }
}
