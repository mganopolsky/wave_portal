// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    
    uint256 i_totalWaves;

    // a mapping of addresses and counts of each
    // so if I send a message, it will map to a another mapping
    // which, in turn, will be a map of addresses, and a count of such
    mapping(address => uint) m_messageCountByAddress;
    mapping(address => string[]) m_messagesByAddress;
    
    constructor() {
        console.log("Heyya **** hey ho, how you drrrrr");
    }

    function wave() public {
        sendMessage("wave");
    }

    function sendMessage(string memory _message) public {
        i_totalWaves++;
        m_messageCountByAddress[msg.sender]++;
        m_messagesByAddress[msg.sender].push(_message);
        console.log("%s has sent a message: %s!", msg.sender, _message);
    }

    function getTotalMessageCount() view public returns(uint256) {
        return i_totalWaves;
    }

    function getMessageCountBySource(address _source) view public returns(uint256) {
        return m_messageCountByAddress[_source];
    }

    function getMessagesBySource(address _source) view public returns(string[] memory){        
        return m_messagesByAddress[_source];
    }
}