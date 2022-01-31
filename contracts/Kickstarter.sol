pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    // avoir using arrays, costs too much gas to iterate
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager, "Only managers can do this.");
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "Your contribution is below the minimum.");

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        // we dont want to create a copy in the memory
        Request storage request = requests[index];

        // check approver is a donator
        require(approvers[msg.sender], "You are not participating to this campaign.");
        // check approver didnt donate already
        require(!request.approvals[msg.sender], "You cannot vote multiple times.");

        // add approver to the mapping
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2), "Not enough people approved this request.");
        require(!request.complete, "This request is already complete");
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}