import { useState } from 'react';
import { ethers } from 'ethers'
import Azogmessenger from './artifacts/contracts/Azogmessenger.sol/Azogmessenger.json'

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function App() {
  const [messenger, setMessenger] = useState();

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  async function fetchMessenger(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, Azogmessenger.abi, provider);
      try{
        const data = await contract.azogmsg();
        console.log("data:", data);
      } catch(err){
        console.log("Error:", err);
      }
    }
  }

  async function setMessengers(){
    if (!messenger) return
    if (typeof window.ethereum !== 'undefined'){
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Azogmessenger.abi, signer);
      const transaction = await contract.setAzogmsg(messenger);
      await transaction.wait();
      fetchMessenger()
    }
  }

  return (
    <div className="text-center bg-amber-300 pb-32 pt-32">
    <h1 className="text-white text-center text-lg"> Azog ETH App </h1>
    <br />
    <h2 className="text-white"> Dapp Developed By Ravinthiran Partheepan </h2>
    <br />
    <textarea className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" onChange={e => setMessenger(e.target.value)} placeholder="set Message" />
    <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchMessenger}> fetch Messenger </button>
        &nbsp;
        &nbsp;
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={setMessengers}> Set Message </button>


    </div>
  );
}

export default App;
