const Wallet = artifacts.require('Wallet')


contract('Wallet', (accounts) => {

    let wallet;
    beforeEach(async ()=> {
        wallet = await Wallet.new(
            [accounts[0], accounts[1], accounts[2]] ,
            2
        );
        //deploying the smart contract
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: wallet.address,
            value: 1000,
        })
    })
    

    it('Correct values for approvers & quorum', async() => {
        const approvers = await wallet.getApprovers();
        const quorum = await wallet.quorum();

        assert.equal(approvers.length, 3, 
        'Should have correct approvers and quorum');


        assert.equal(approvers[0], accounts[0]);
        assert.equal(approvers[1], accounts[1]);
        assert.equal(approvers[2], accounts[2]);


        assert.equal(quorum, 2);
    });

    it('Should not allow non-approvers to approve transaction', async() => {
        try{
            await wallet.approveTransfers(0, {from: accounts[5]});
        }catch(e){
            e.message.includes("only approvers can call this function");
            return ;
        }
        assert(false);
    })

    it('Check for invalid transaction IDs', async() => {
        try{
            await wallet.approveTransfers(0, {from: accounts[0]});
        }catch(e){
            e.message.includes("no transfer with this ID exists");
            return ;
        }
        assert(false);
    })

    it('Should Create Valid Transfer', async () => {
        await wallet.addEther({
            from: accounts[0],
            value: web3.utils.toWei("0.3","ether") 
        });

        await wallet.createTransaction(
            web3.utils.toWei("0.2","ether"),
            accounts[5],
            {from: accounts[1]}
        );

        const transfers = await wallet.getTransfers();

        assert.equal(transfers.length, 1, 'length != 1');
        assert.equal(transfers[0].to, accounts[5],
        'tx to address wrong' );
        assert.equal(
            transfers[0].amount,
            web3.utils.toWei("0.2", "ether"),
            'tx value is not 0.2 ether'
        );
        assert.equal(
            transfers[0].sent,
            false,
            'tx should not declare itself as sent'
        );
        assert.equal(
            transfers[0].approvals,
            0,
            'tx approvals should be zero'
        );
    })
});