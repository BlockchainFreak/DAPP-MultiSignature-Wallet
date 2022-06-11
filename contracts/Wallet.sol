// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet{
    event TxCreated(uint indexed id, uint amount, address payable to);
    event TxApproved(uint indexed id, address sender);
    event TxDisApproved(uint indexed id, address sender);
    event TxExecuted(uint indexed id, uint amount, address payable to);

    address[] public approvers;
    uint Balance;
    uint public quorum;
    struct Transfer{
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }
    
    Transfer[] public transfers;
    mapping(address => mapping(uint=>bool))public approvals;

    constructor(address[] memory _approvers, uint _quorum) payable{
        require(_approvers.length >= _quorum, "quorum should be <= approvers");
        approvers = _approvers;
        quorum = _quorum;
        Balance += msg.value;
    }

    receive() external payable {
        Balance += msg.value;
    }

    function addEther() external payable{
        Balance += msg.value;
    }

    function getApprovers() external view returns(address[] memory){
        return approvers;
    }

    function getTransfers() external view returns(Transfer[] memory){
        return transfers;
    }

    function createTransaction(uint amount, address payable to)external onlyApprovers{
        transfers.push(Transfer(
            transfers.length,
            amount,
            to,
            0,
            false
        ));
        emit TxCreated(transfers.length, amount, to);
    }

    function approveTransfer(uint id) external onlyApprovers{
        require(id < transfers.length, "no transfer with this ID exists");
        require(transfers[id].sent == false,
        "transfer has already been sent");
        require(approvals[msg.sender][id] == false, 
        "cannot approve transaction twice");

        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        emit TxApproved(id, msg.sender);

        if(transfers[id].approvals >= quorum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint amount = transfers[id].amount;
            to.transfer(amount);
            emit TxExecuted(id, amount, to);
        }
    }

    function disApproveTransfer(uint id) external onlyApprovers{
        require(id < transfers.length, "no transfer with this ID exists");
        require(transfers[id].sent == false,
        "transfer has already been sent");
        require(approvals[msg.sender][id] == true, 
        "tx is not approved");

        approvals[msg.sender][id] = false;
        transfers[id].approvals--;
        emit TxDisApproved(id, msg.sender);
    }

    modifier onlyApprovers{
        bool present;
        for(uint i = 0 ; i<approvers.length ; ++i){
            if(approvers[i] == msg.sender){
                present = true; break;
            }
        }
        require(present, "only approvers can call this function");
        _;
    }

}