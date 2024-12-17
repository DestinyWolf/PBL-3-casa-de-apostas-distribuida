// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;
pragma abicoder v2;

contract WorkToken {

    //declaração de variaveis
    string private _name = "Lulacoins Token";
    string private _symbol = "LCT";
    string private standard = "WorkToken v1.0";
    uint256 private _totalSupply;
    uint256 private _decimals = 18;

    //eventos
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    // allowance e balanceOf 2 mappings
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    //construtor, função que é execultada apenas uma unica vez durante o deploy do contrato
    constructor(uint256 _initialSupply) {
        balanceOf[msg.sender] = _initialSupply * 10 ** _decimals;
        _totalSupply = _initialSupply  * 10 ** _decimals ; 
    }

    //trasnferencia de tokens interna de uma carteira para outra
    function transfer(address _to, uint256 _value) public returns(bool) {
        require(balanceOf[msg.sender] >= _value, "no have cash strange");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    //aprova que um terceiro possa realizar transferencia de uma carteira para outra
    function approve(address _spender, uint256 _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    //transferencia externa de uma carteira para outra
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
        require(balanceOf[_from] >= _value, "he not have cash");
        require(allowance[_from][msg.sender] >= _value, "spender limit exceeded");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    //funções de apenas visualização, não alteram o estado do contrato

    function balance(address _who) public view returns(uint256 cash) {
        return balanceOf[_who];
    }
    //retorna o nome dos tokens
    function name() public view returns(string memory) {
        return _name;
    }

    //retorna o simbolo dos tokens
    function symbol() public view returns(string memory) {
        return _symbol;
    }

    //retorna o valor da menor fração de um token
    function decimals() public view returns(uint256) {
        return _decimals;
    }

    //retorna o total de tokens existentes
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
}