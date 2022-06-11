import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import './style.css'
import { getWeb3, getWallet } from './utils.js' 
import Loading  from "./components/Loading";
import NewTransaction from "./components/NewTransaction";
import TransactionList from "./components/TransactionList";
import MessageBar from "./components/MessageBar";

function App() {

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState(undefined);
  const [quorum, setQuorum] = useState(undefined);
  const [txList, setTxList] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(['no messages']);

  useEffect(() => {
    const init = async () => {
      const _web3 = await getWeb3();
      const _accounts = await _web3.eth.getAccounts();
      const _wallet = await getWallet(_web3);
      const _approvers = await _wallet.methods.getApprovers().call();
      const _quorum = await _wallet.methods.quorum().call();
      const _txList = await _wallet.methods.getTransfers().call();
      console.log(_accounts);
      setWeb3(_web3);
      setAccounts(_accounts);
      setWallet(_wallet);
      setApprovers(_approvers);
      setQuorum(_quorum);
      setTxList(_txList);
    }
    init();
  }, [])

  if(
    typeof web3 === 'undefined' ||
    typeof wallet === 'undefined' ||
    typeof accounts === 'undefined'
  ){
    return (<Loading><div></div></Loading>)
  }

  const resolveErrorMsg = (str) => {
    const splits = str.split(`RPC '{"`);
    if(str.length === 1){
      return str;
    }else{
      return JSON.parse(str[1]);
    }
  }

  const createTransaction = async(tx) => {
    try{
      await wallet.methods
        .createTransaction(tx.amount, tx.to)
        .send({from: tx.from})
    }catch(err){
      setErrorMsg(prevState => {
        return [err.message, ...prevState]
      })
    }
  }

  const approveTransaction = async (txId, sender) => {
    try{
      console.log(txId, ':- ',sender)
      await wallet.methods
        .approveTransfer(txId)
        .send({from: sender})
    }catch(err){
      setErrorMsg(prevState => {
        return [err.message, ...prevState]
      })
    }
  }

  return (
    <div className="App">
        <section className="sidebar">
          <Header />
          <NewTransaction createTransaction={createTransaction} />
        </section>
        <section className="mainbar">
          <TransactionList
            txList={txList}
            approveTx = {approveTransaction}
            accounts = {approvers}
          />
          <MessageBar
            messages={errorMsg}
          >
          </MessageBar>
        </section>
    </div>
  );
}

export default App;
