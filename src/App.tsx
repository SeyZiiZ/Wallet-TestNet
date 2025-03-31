import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, formatEther, parseEther } from 'ethers';
import Wallet from './artifacts/contracts/Wallet.sol/Wallet.json';
import './App.css'

const walletAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function App() {
  const [balance, setBalance] = useState<number | string>(0);
  const [amountSend, setAmountSend] = useState<number | string>(0);
  const [amountWithdraw, setAmountWithdraw] = useState<number | string>(0);
  const [error, setError] = useState<string>('');
  const [succes, setSucces] = useState<string>('');

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(walletAddress, Wallet.abi, provider);
        
        const data = await contract.getBalance({ from: accounts[0] });
        setBalance(formatEther(data));
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération du solde");
      }
    }
  }  

  async function transfer() {
    if(!amountSend) {
      return;
    }

    setError('');
    setSucces('');
    if(typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      try {
        const tx = {
          from: accounts[0],
          to: walletAddress,
          value: parseEther(String(amountSend))
        }
        const transaction = (await signer).sendTransaction(tx);
        (await transaction).wait();
        setAmountSend('');
        await getBalance();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setSucces('Votre argent a bien été transféré, rechargement de votre solde ....');

      } catch(error: any) {
        setError("Erreur lors du transfer");
      }
    }
  }

  function changeAmountSend(e: any) {
    setAmountSend(e.target.value);
  }

  async function withdraw() {
    if (!amountWithdraw) {
      return;
    }
    setError('');
    setSucces('');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(walletAddress, Wallet.abi, signer);

    try {
      const transaction = await contract.withdrawMoney(accounts[0], ethers.parseEther(String(amountWithdraw)))
      await transaction.wait();

      setAmountWithdraw('');
      await getBalance();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setSucces('Votre argent a bien été transféré, rechargement de votre solde ....');

    } catch(error) {
      setError('Une erreur est survenue');
    }
  }

  function changeAmountWithdraw(e: any) {
    setAmountWithdraw(e.target.value);
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10 font-sans">
      <div className="max-w-xl mx-auto bg-gray-900 shadow-xl rounded-xl p-8 space-y-6 border border-gray-700">
  
        <h1 className="text-3xl font-bold text-center text-teal-400">💸 Wallet Web3</h1>
  
        {error && (
          <p className="text-red-500 text-center bg-red-900/30 p-2 rounded">{String(error)}</p>
        )}
  
        {succes && (
          <p className="text-green-400 text-center bg-green-900/30 p-2 rounded">{succes}</p>
        )}
  
        <div className="text-center">
          <h2 className="text-2xl font-semibold">💰 Solde : <span className="text-teal-300">{balance}</span> ETH</h2>
        </div>
  
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-teal-200">➡️ Envoyer de l'ETH</h3>
          <input
            type="text"
            name="amountSend"
            placeholder="Montant en ETH"
            onChange={changeAmountSend}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={transfer}
            className="w-full bg-teal-600 hover:bg-teal-700 transition text-white font-semibold py-2 rounded"
          >
            Envoyer
          </button>
        </div>
  
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-teal-200">⬅️ Retirer de l'ETH</h3>
          <input
            type="text"
            name="amountWithdraw"
            placeholder="Montant en ETH"
            onChange={changeAmountWithdraw}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={withdraw}
            className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded"
          >
            Retirer
          </button>
        </div>
      </div>
    </div>
  )
  
}

export default App
