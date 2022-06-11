import Web3 from 'web3'
import Wallet from './contracts/Wallet.json'

const getWeb3 = () => {
    return new Promise(async(resolve, reject) => {
        // Waiting for Load Event to avoid Race conditions
          
        // addEventListener('load', async () => {
            if(window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try{
                    await window.ethereum.enable();
                    resolve(web3);
                }catch (err) {
                    reject(err);
                }
            }else if(window.web3){
                resolve(window.web3);
            }else{
                reject('Must install Metamask');
            }
        // });
    })
}

const getWallet = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Wallet.networks[networkId];
    return new web3.eth.Contract(
        Wallet.abi,
        "0x9010921320AE13baF474DCc4fB23B517e8F858aD"
    );
    // return newWallet;
}

export {getWeb3 , getWallet};