'use client'
import { FC, use, useState } from "react";
import Web3 from "web3";

interface Dataitem   {
    id: string;
    totalAmmount: number;
    odd: number[];
    status:string;
}

interface DataMange {
    id: string;
    totalAmmount: number;
    odd: number[];
    bettors: number;
}

interface oldResults {
    id: string;
    supply: number;
    winners: string[];
}

export default function Home() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545/"));

    const abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
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
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "NewBet",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "betOdd",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "endBet",
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
            "inputs": [],
            "name": "getAllBets",
            "outputs": [
                {
                    "internalType": "contract BetContract[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "getBetAddress",
            "outputs": [
                {
                    "internalType": "contract BetContract",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "newBet",
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
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "opc",
                    "type": "uint256"
                }
            ],
            "name": "payABet",
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
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "showBetGift",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    

    const betAbi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
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
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "opc",
                    "type": "uint256"
                }
            ],
            "name": "Bet",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address[]",
                    "name": "wallet",
                    "type": "address[]"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "result",
                    "type": "uint256"
                }
            ],
            "name": "Winners",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "CalcOdd",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
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
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "opc",
                    "type": "uint256"
                }
            ],
            "name": "bet",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "bettors",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAmmountForWinner",
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
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPlayers",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getStatusBet",
            "outputs": [
                {
                    "internalType": "enum BetContract.Status",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getValueGift",
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
            "name": "getWinner",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "giftWinners",
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
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "statusClose",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "statusOpen",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    const worktokenAbi = [
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

    const workTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    const smartContract = new web3.eth.Contract(abi, contractAddress)
    const workTokenContract = new web3.eth.Contract(worktokenAbi, workTokenAddress);
    


    const [data, setData] = useState<Dataitem[]>([])
    const [account, setAccount] = useState<string>()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        switch(name) {
            case 'account':
                setAccount(value)
                break;
        }
    }

    const [hasBet, setHasBet] = useState(false)
    const newData = async () => {
        try{
            
            if (hasBet) {
                alert('Usuario ja possui uma bet')
            } else {
                const estimateGas = await smartContract.methods.newBet(account).estimateGas({from:account})
                await smartContract.methods.newBet(account).send({from:account, gas:estimateGas.toString()})
                
                const allBets = await smartContract.methods.getAllBets().call();
                console.log(allBets)
                const id = allBets[allBets.length-1];
                const betContract = new web3.eth.Contract(betAbi, id);
                const odd = await betContract.methods.CalcOdd().call();
                const totalAmmount = await betContract.methods.getValueGift().call();
                const _status = await betContract.methods.getStatusBet().call();


                setData((prev) => [
                    ...prev,
                    {id:id, odd:odd, totalAmmount:totalAmmount, status:_status}
                    ])
                await handleManage()
                setManage(false)
            }

            
        } catch (error) { 
            console.log(error)
        }
    }

    const [active, setActive] = useState(false)
    const [logged, setLogged] = useState<boolean>(false);
    
    const [id, activeHandler]  = useState<string>()
    const [value, setValue] = useState<number>()
    const [opc, setOpc] = useState<number>()
    const [LCT, setLCT] = useState<number>()


    const handleValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        switch(name) {
            case 'ammoutToBet':
                setValue(value)
                //console.log(value)
                break;
            case 'Option':
                setOpc(value)
                //console.log(value)
                break;
        }
    }
    
    const handleLogin = async () => { 
        if (web3.utils.isAddress(account)) {
            const cash = await workTokenContract.methods.balanceOf(account).call();
            const allBets = await smartContract.methods.getAllBets().call();
            setData([])
            for(var i = 0; i < allBets.length; i++) {
                let id = allBets[i];
                const betContract = new web3.eth.Contract(betAbi, id);
                
                let _status = await betContract.methods.getStatusBet().call();

                if (_status == 1) {

                    let odd = await betContract.methods.CalcOdd().call();
                    let totalAmmount = await betContract.methods.getValueGift().call();
                    console.log(await betContract.methods.getStatusBet().call())

                    setData((prev) => [
                        ...prev,
                        {id:id, odd:odd, totalAmmount:totalAmmount, status:_status}
                        ])
                    }
            }
            handleManage()
            setLCT(cash)
            setLogged(true)

        }
    }

    const [manage, setManage] = useState<boolean>(true)

    //ta funcionando +- corrigir uns bugs
    const handleManage = async() => {
        
        if (!manage) {
            const address = await smartContract.methods.getBetAddress(account).call()
            const contract = new web3.eth.Contract(betAbi, address)
            const status = await contract.methods.getStatusBet().call()

            if (status == 1) {
                
                setHasBet(true)
                let _id = contract.options.address
                let _odd = await contract.methods.CalcOdd().call()
                let _totalAmmount = await contract.methods.getValueGift().call()
                let _bettors = await contract.methods.getPlayers().call();

                setBetContractToManage({id:_id, odd:_odd, totalAmmount:_totalAmmount, bettors:_bettors?.length})
            }
        }
        setManage(!manage)
    }

    //ta funcionando
    const handleFinish = async() => {
        
        try {
            
            const estimatedGas = await smartContract.methods.endBet(account).estimateGas({from:account})
            await smartContract.methods.endBet(account).send({from:account, gas:estimatedGas.toString() })
            
            const index = data.indexOf(betContractToManage?.id)
            data.pop(index)
            setActive(false)
            setManage(false)
            setBetContractToManage({id:'', odd:[], totalAmmount:0, bettors:0})
            setData(data)
            setHasBet(false)

            alert("bet encerrada")
        } catch (error) {
            alert(`erro em bet ${error}`)
        }
        
    }


    const [betContractToManage, setBetContractToManage] = useState<DataMange>()
    const handleActive = async () => {
        try {
            let estimateGas =  await workTokenContract.methods.approve(id, 100000).estimateGas({from:account});
            const apostaContract = new web3.eth.Contract(betAbi, id);
            await workTokenContract.methods.approve(id, 100000).send({from: account, gas:estimateGas.toString()});
            const owner = await apostaContract.methods.getOwner().call();
            estimateGas = await smartContract.methods.payABet(owner, value, opc).estimateGas({from:account})
            await smartContract.methods.payABet(owner, value, opc).send({from:account, gas:estimateGas.toString()})
            alert(`Aposta de ${value} Lula coins na opc ${opc} foi feita com sucesso!`)
            const cash = await workTokenContract.methods.balanceOf(account).call();
            setValue(cash)

            const index = data.indexOf(id)
            data.pop(index)

            const odd = await apostaContract.methods.CalcOdd().call()
            const totalAmmount = await apostaContract.methods.getValueGift().call()
            const _status = await apostaContract.methods.getStatusBet().call()
            setData((prev) => [
                ...prev,
                {id:id, odd:odd, totalAmmount:totalAmmount, status:_status}
                ])
            
            setOpc(0)
        } catch(error) {
            console.log("erro ao pagar bet: ", error)
        }
        
    }

    const [TorS, setTorS] = useState(true)

    const [oldResult, setOldResult] = useState<oldResults[]>([])

    const handleSearch = async() => {
        setTorS(!TorS)
        if (!TorS) {
            try {
            
                const allBets = await smartContract.methods.getAllBets().call()
                setOldResult([])
    
                for (var i = 0; i < allBets.length; i++) {
                    
                    const contract = new web3.eth.Contract(betAbi,allBets[i])
                    const value = await contract.methods.getAmmountForWinner().call()
                    const opcWinner = await contract.methods.getWinner().call();
                    
                    setOldResult((prev) => [
                    ...prev,
                    {id:allBets[i], winners:opcWinner, supply:value}
                    ])
                }
            } catch (error) {
                console.log('deu ruim aqui pae', error)
            } 
        }
        
        
    }

    return (
        <>
            {logged ? (
                <main className="flex justify-center items-center">
                <div className="flex flex-col p-2">
                    <h1 className="font-medium justify-center text-center items-center">{`Account: ${account}`}</h1>
                    <h2 className="font-medium justify-center text-start items-start">{`Coins: ${LCT}`}</h2>
                    <div className="p-2 m-2">
                        <button className="rounded-lg border-3 bg-black text-white px-3 py-2 mr-2" onClick={() => newData()}> New Bet</button>
                        <button className="rounded-lg border-3 bg-black text-white px-3 py-2 ml-2 mr-2" onClick={() => handleManage()}> Manage Bet</button>
                        <button onClick={() =>  handleSearch()}>Resultados</button>
                    </div>
                    <div className="flex">
                        <div> 
                            {
                                TorS ? (
                                    <table className="m-2">
                                <thead>
                                    <tr>
                                    </tr>
                                </thead>
                                <tbody className="p-2 m-2">
                                    {data.map((item) => (
                                        <tr  className="m-2">
                                            <td className="border-2 border-black rounded-lg m-2 p-2 flex flex-col"> 
                                                <div className="flex flex-col" onClick={() => {setActive(!active); activeHandler(item.id)}}>
                                                    <div>
                                                        Bet hash: {item.id}
                                                    </div>
                                                    <div>
                                                        Odd: {item.odd[0]}:{item.odd[1]}
                                                    </div>
                                                    <div>
                                                        Total ammount: {item.totalAmmount}
                                                    </div>
                                                    <div>
                                                        Bet Status: {item.status}
                                                    </div>
                                                </div> 
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                                ) : (
                                    <table className="m-2">
                                <thead>
                                    <tr>
                                    </tr>
                                </thead>
                                <tbody className="p-2 m-2">
                                    {oldResult?.map((item) => (
                                        <tr  className="m-2">
                                            <td className="border-2 border-black rounded-lg m-2 p-2 flex flex-col"> 
                                                <div className="flex flex-col" >
                                                    <div>
                                                        Bet hash: {item.id}
                                                    </div>
                                                    <div>
                                                        Total ammount for user: {item.supply}
                                                    </div>
                                                    <div>
                                                        {`Wallets Winners: ${item.winners.map(item => item).join(', ')}`}
                                                    </div>
                                                </div> 
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                                )
                            }
                            
                            {manage ? (
                                <div className=" flex flex-col">
                                    <button className="rounded-lg border-3 bg-black text-white px-3 py-2" onClick={() => handleFinish()}>
                                        End Bet
                                    </button>
                                    <label>
                                        {`Total amount ${betContractToManage?.id}`}
                                    </label>
                                    <label>
                                        {`ODD: ${betContractToManage?.odd[0]}:${betContractToManage?.odd[1]}`}
                                    </label>
                                    <label>
                                        {`Bettors: ${betContractToManage?.bettors}`}
                                    </label>

                                </div>
                            ):(<></>)}
                        </div>
                        <div>
                            {active ? (
                                <div className="flex ">
                                    <button className="rounded-lg border-3 bg-black text-white px-2 py-1" onClick={()  => handleActive()}>Bet</button>

                                    <input
                                    className="border-2 border-black rounded-lg ml-2 py-1" 
                                    type="number"
                                    placeholder="Value to bet" 
                                    name="ammoutToBet"
                                    onChange={handleValue}
                                    />

                                    <input 
                                    className="border-2 border-black rounded-lg ml-2 py-1"
                                    type="number" 
                                    placeholder="Option" 
                                    name='Option'
                                    onChange={handleValue}
                                    />
                                </div>
                            ):(
                                <div></div>
                            )}
                        </div>
                    </div>
                        
                    
                </div>
            </main>):(
                <main className="flex justify-center align-middle items-center">
                    <label className="mr-2">Account: </label>
                    <input 
                    className="border-2 border-black rounded-lg ml-2 py-1"
                    type="text" 
                    name="account"
                    placeholder="Enter your account number"
                    onChange={handleInput}
                    />
                    <button className="rounded-lg border-3 bg-black text-white px-3 py-2" onClick={() => handleLogin()}>LogIn</button>
                </main>
            )}
        </>
    )
}