'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Web3 from "web3";
import {} from "react-icons";
import { FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export default function Home() {

    const router = useRouter();
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545/"));

    const abi = [
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
    

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const smartContract = new web3.eth.Contract(abi, contractAddress)

    const [connected, setConnected] = useState(false);

    const [balance, setBalance] = useState<number | undefined>();
    const [account, setAccount] = useState('');
    const [accountApprove, setAccountApprove] = useState<string>()
    const [accountApproveAmount, setAccountApproveAmount] = useState<number>()

    const [accountSource, setAccountSource] = useState<string>()

    const handleAccountChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        switch(name) {
            case "accountToken":
                setAccount(value);
                break;
            case "accountApprove":
                setAccountApprove(value);
                break;
            case "accountSource":
                setAccountSource(value);
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
            const gasEstimeted = await smartContract.methods.approve(accountApprove, accountApproveAmount).estimateGas({from: account});
            const status = await smartContract.methods.approve(accountApprove, accountApproveAmount).send({from:account, gas:gasEstimeted.toString()});

            if (status.status) {
                alert("new account approved");
            } else {
                alert("error");
            }
        } catch (error) {
            console.error("Erro ao buscar aprovar ", error)
        }
    }
    const handleTransfer = async() => {
        if (!web3.utils.isAddress(accountApprove)) {
            console.error("Endereco invalido");
            return;
        }

        try {
            const gasEstimeted = await smartContract.methods.transfer(accountApprove, accountApproveAmount).estimateGas({from: account});
            const status = await smartContract.methods.transfer(accountApprove, accountApproveAmount).send({from:account, gas:gasEstimeted.toString()});

            if (status.status) {
                alert(`transfer of ${accountApproveAmount} to ${accountApprove} was successful`);
            } else {
                alert("error to transfer ammount");
            }
        } catch (error) {
            console.error("Erro ao buscar tranferir ", error)
        }
    }

    const handleTransferFrom = async() => {
        if (!web3.utils.isAddress(accountApprove) || !web3.utils.isAddress(accountSource)) {
            console.error("Endereco invalido");
            return;
        }

        try {
            const gasEstimeted = await smartContract.methods.transferFrom(accountSource, accountApprove, accountApproveAmount).estimateGas({from: account});
            const status = await smartContract.methods.transferFrom(accountSource, accountApprove, accountApproveAmount).send({from:account, gas:gasEstimeted.toString()});

            if (status.status) {
                alert(`transfer of ${accountSource} to ${accountApprove} of the value of ${accountApproveAmount} was successful`);
            } else {
                alert("error to transfer ammount");
            }
        } catch (error) {
            console.error("Erro ao buscar tranferir ", error)
        }
    }
    
    return (
        <div className="flex items-center justify-center">
            <main>
            {!connected ? (
                <div className="flex  mt-3 justify-center items-center">
                    <label className="mr-2">Account:</label>
                    <input className="border-2 mr-3 border-black"
                        type="text"
                        id="Account"
                        name="accountToken"
                        value={account}
                        onChange={handleAccountChange}
                    />
                    <button className="rounded-lg border-3 bg-black text-white px-3 py-2" onClick={() => {
                        handleConnect()
                    }}>
                        <div className="flex align-middle items-center justify-center"> <FaSignInAlt/> <div className="ml-1">Loggin</div></div>
                    </button>
                </div>
            ) : (
                <div className="flex flex-col text-center justify-center items-center">
                    <div className="flex flex-col align-top justify-start text-center items-start mb-12 p-12">
                        <div>{`conta: ${account}`}</div>
                        <div>{`saldo: ${ balance}`}</div>
                    </div>
                        
                    <div className=" flex p-11 rounded-lg mb-12">
                        <label className="mr-4 text-center text-xl font-semibold" htmlFor="approve">Approve</label>
                        <input className="mr-2 p-2 border-2 border-gray-400 rounded-lg" 
                        type="text"
                            placeholder="wallet address"
                            name="accountApprove"
                            onChange={handleAccountChange}
                        >
                        </input>
                        <input className="mr-2 p-2 border-2 border-gray-400 rounded-lg"
                            type="number"
                            placeholder="value"
                            name="approveAmount"
                            onChange={handleAmountChange}
                        />
                        <button className="rounded-lg border-3 bg-black text-white px-3 py-2 hover:bg-slate-800" onClick={() => handleApprove()}> 
                        <div className="flex align-middle items-center justify-center"> <FaCheck/> <div className="ml-1">Approve</div></div>
                        </button>

                    </div>
                    <div className=" flex  p-12 rounded-lg mt-4 mb-12">
                        <label className="mr-4 text-center text-xl font-semibold" htmlFor="Transfer">Transfer</label>
                        <input className="mr-2 p-2 border-2 border-gray-400 rounded-lg"
                            type="text"
                            placeholder="wallet address"
                            name="accountApprove"
                            onChange={handleAccountChange}
                        >
                        </input>
                        <input className="mr-2 p-2 border-2 border-gray-400 rounded-lg"
                            type="number"
                            placeholder="Value"
                            name="approveAmount"
                            onChange={handleAmountChange}
                        />
                        <button className="rounded-lg border-3 bg-black text-white px-3 py-2 hover:bg-slate-800" onClick={() => handleTransfer()}>
                            <div className="flex align-middle items-center justify-center"> <FaCheck/> <div className="ml-1">Transfer</div></div>
                        </button>

                    </div>
                    <div className=" flex  p-8 rounded-lg mt-4 justify-center align-middle items-center">
                        <div className="flex flex-col">
                            <label className="mr-4 text-center text-xl font-semibold" htmlFor="TransferFrom">Transfer</label>
                            <label className="mr-4 text-center text-xl font-semibold" htmlFor="TransferFrom">From</label>
                        </div>
                        
                        <div className="flex flex-col">
                            <input className="mr-2 p-2 border-2 border-gray-400 rounded-lg mb-2"
                                type="text"
                                placeholder="Source address"
                                name="accountSource"
                                onChange={handleAccountChange}
                            >
                            </input>
                            <input className="mr-2 p-2 border-2 border-gray-400 rounded-lg mt-2" 
                                type="text"
                                placeholder="Destination address"
                                name="accountApprove"
                                onChange={handleAccountChange}
                            >
                            </input>
                        </div>
                        
                        <input className="mr-2 p-2 border-2 border-gray-400 rounded-lg"
                            type="number"
                            placeholder="Value"
                            name="approveAmount"
                            onChange={handleAmountChange}
                        />
                        <button className="rounded-lg border-3 bg-black text-white px-3 py-2 hover:bg-slate-800" onClick={() => handleTransferFrom()}>
                            <div className="flex align-middle items-center justify-center"> <FaCheck/> <div className="ml-1">Transfer</div></div>
                        </button>

                    </div>
                    
                </div>
                
            )
            }

            
                <footer className=" mt- p-4 text-center justify-start align-bottom items-start">
                    <button className="rounded-lg border-2 border-black bg-gray-300 text-black px-3 py-2 hover:bg-gray-400" onClick={() => {router.push('/')}}> 
                        <div className="flex align-middle items-center justify-center"> <FaArrowLeft/> <div className="ml-1">Back</div></div>
                    </button>
                </footer>
            </main>
            
        </div>
        
    )
}