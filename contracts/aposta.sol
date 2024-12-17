// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./workToken.sol";

contract BetContract {

    //enum pra definir o status da aposta
    enum Status {CLOSED, OPEN}

    //variaveis
    address[] private allBettors;
    address private owner;
    address private tokenAddress;
    int256 private opc1;
    int256 private opc2;
    int256 private amoutOpc1;
    int256 private amoutOpc2;
    mapping (int => address[]) bettors;
    Status betStatus;

    //somente o dono do contrato podera chamar a funcao
    modifier isOwner(address _from){
        require(_from == owner, "Only the owner can perform this action");
        _;
    }

    constructor(address token, address _owner) {
        owner = _owner;
        tokenAddress = token;
        betStatus = Status.OPEN;
        opc1 = 0;
        opc2 = 0;
        amoutOpc1 = 0;
        amoutOpc2 = 0;
    }

    
    //eventos que sao registrados na blockchain
    event Bet(address indexed _to, address _from, int256 _amount, int256 opc);
    event Winners(address[] indexed wallet, address indexed  owner,int256  amount, int256 result);


    //criacao de uma aposta
    function bet(address _from, int256 amount, int256 opc) public returns(bool) {
        require(betStatus == Status.OPEN, "bet closed");
        require(amount == 500, "bet amount must be 500");
        require(opc == 1 || opc == 2, "opc must be 1 or 2");

        if (opc % 2 == 0) {
            opc1 += 1;
            amoutOpc1 += (amount - (amount * 5 / 100));
            bettors[opc].push(_from);
        } else {
            opc2 += 1;
            amoutOpc2 += (amount - (amount * 5 / 100));
            bettors[opc].push(_from);
        }
        WorkToken(tokenAddress).transferFrom(_from, address(this), amount); //recolhe o dinheiro da pessoa
        WorkToken(tokenAddress).transfer(owner, amount * 5 / 100); //envia 5% para o dono do contrato
        allBettors.push(_from);
        emit Bet(_from, address(this), amount, opc);
        return true;
    }

    //realiza o calculo da odd
    function CalcOdd() public view returns(int256[] memory) {
        int256[] memory odd = new int256[](2);
        odd[0] = amoutOpc1;
        odd[1] = amoutOpc2;
        return odd;
    }

    //sorteia os ganhadores
    function giftWinners(address _owner) public isOwner(_owner) returns (bool) {
        require(betStatus == Status.OPEN, "bet closed");
        
        if (allBettors.length != 0 ) {
            int number = int(random()) % 2;
            int balance = WorkToken(tokenAddress).balanceOf(address(this)); //valor armazenado no contrato

            int256 amoutForUser = balance / (number == 0 ? opc1 : opc2); // calcula quanto cada carteira ira receber

            //caso ninguem ganhe devolve o dinheiro removendo a taxa
            if (bettors[number].length == 0){
                for(uint256 i = 0; i < allBettors.length; i++) {
                    amoutForUser = balance / int(allBettors.length);
                    WorkToken(tokenAddress).transfer(allBettors[i], amoutForUser);
                }
            }

            //transfere para cada usuario o valor que ele ganhou
            for(uint256 i = 0; i < bettors[number == 0  ? int(0):int(1)].length; i++) {
                WorkToken(tokenAddress).transfer(bettors[number == 0  ? int(0):int(1)][i], amoutForUser);
            }
            int256 restOfMoney = WorkToken(tokenAddress).balanceOf(address(this));
            if(restOfMoney > 0){
                WorkToken(tokenAddress).transfer(owner, restOfMoney);
            }

            //realiza a emissao do evento
            emit Winners(bettors[number], owner, balance, number);

            betStatus = Status.CLOSED;
            opc1 = 0;
            opc2 = 0;
            amoutOpc1 = 0;
            amoutOpc2 = 0;
            bettors[1] = new address[](0);
            bettors[2] = new address[](0);
            allBettors = new address[](0);
            
            
            
        } else {

            betStatus = Status.CLOSED;
            opc1 = 0;
            opc2 = 0;
            amoutOpc1 = 0;
            amoutOpc2 = 0;
            bettors[1] = new address[](0);
            bettors[2] = new address[](0);
            allBettors = new address[](0);

            //realiza a emissao do evento
            emit Winners(allBettors, owner, 0, 0);
        }
        
        return true;
    }

    //retorna o premio total ate o momento da consulta
    function getValueGift() public view returns(int256) {
        require(betStatus == Status.OPEN, "bet closed");
        return WorkToken(tokenAddress).balanceOf(address(this));
    }

    //retorna todos os apostadores
    function getPlayers() public view returns(address[] memory) {
        return allBettors;
    }

    //fecha a aposta
    function statusClose(address _owner) public isOwner(_owner) {
        betStatus = Status.CLOSED;
    }

    //abre a aposta
    function statusOpen(address _owner) public isOwner(_owner) {
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

    function getOwner() public view returns(address) {
        return owner;
    }
}
