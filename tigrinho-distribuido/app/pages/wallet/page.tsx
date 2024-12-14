'use client'

import { useState } from "react";
import Web3 from "web3";
export default function Home() {

    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545/"));

    const abi = 
        [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_initialSupply",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_who",
                        "type": "address"
                    }
                ],
                "name": "balance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "cash",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    

    const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

    const smartContract = new web3.eth.Contract(abi, contractAddress)

    const [connected, setConnected] = useState(false);

    const [balance, setBalance] = useState<number | undefined>();
    const [account, setAccount] = useState('');
    const [accountApprove, setAccountApprove] = useState<string>()
    const [accountApproveAmount, setAccountApproveAmount] = useState<number>()

    const [statusApprove, setStatusApprove] = useState<boolean>()

    const handleAccountChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        switch(name) {
            case "accountToken":
                setAccount(value);
                break;
            case "accountApprove":
                setAccountApprove(value);
                break;
            
        }
    } 
    
    const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        switch(name) {
            case "approveAmount":
                setAccountApproveAmount( parseInt(value));
                break;
            case "accountApprove":
                setAccountApprove(value);
                break;
            
        }
    }


    const handleConnect = async () => {
        if (!web3.utils.isAddress(account)) {
            console.error("Endereco invalido");
            return;
        }
            setConnected(true)
            try {
                const cash = await smartContract.methods.balanceOf(account).call();
                setBalance(cash);
                console.log(cash)
            } catch (error) {
                console.error("Erro ao buscar saldo ", error)
            }
    }

    const handleApprove = async() => {
        if (!web3.utils.isAddress(accountApprove)) {
            console.error("Endereco invalido");
            return;
        }

        try {
            const status = await smartContract.methods.approve(accountApprove, accountApproveAmount).send({from: account});
            console.log(status)
            setStatusApprove(status)
            if (statusApprove) {
                alert("new account approved");
            } else {
                alert("error");
            }
        } catch (error) {
            console.error("Erro ao buscar saldo ", error)
        }
    }

    
    return (
        <div className="flex items-center justify-center">
            <main>
            {!connected ? (
                <div className="flex flex-col justify-center items-center">
                    <label className="mr-2">Account:</label>
                    <input className="border-2 border-black"
                        type="text"
                        id="Account"
                        name="accountToken"
                        value={account}
                        onChange={handleAccountChange}
                    />
                    <button className="border-2 rounded-md border-red-300" onClick={() => {
                        handleConnect()
                        
                    }}>loggin</button>
                </div>
            ) : (
                <div className="flex flex-col text-center justify-center items-center">
                    <div>{`conta: ${account}`}</div>
                    <div>{`saldo: ${ balance}`}</div>

                    <div className=" flex border-2 border-black p-4 rounded-lg">
                        <label className="mr-4" htmlFor="approve">Approve</label>
                        <input className="mr-2 p-2" 
                        type="text"
                            placeholder="wallet address"
                            name="accountApprove"
                            onChange={handleAccountChange}
                        >
                        </input>
                        <input type="number"
                            placeholder="000"
                            name="approveAmount"
                            onChange={handleAmountChange}
                        />
                        <button onClick={() => handleApprove}> Approve</button>

                    </div>
                </div>
                
            )
            }

            </main>
        </div>
        
    )
}