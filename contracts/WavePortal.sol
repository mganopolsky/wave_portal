// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    
    uint256 i_totalWaves;
    uint256 private seed;

    // a mapping of addresses and counts of each
    // so if I send a message, it will map to a another mapping
    // which, in turn, will be a map of addresses, and a count of such
    mapping(address => uint) m_messageCountByAddress;
    mapping(address => uint256) public lastWavedAt;

    event NewWave(address indexed from, uint256 timestamp, string message);
    
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("I am a smart contract. POG.");

        // easy way to hack a random number generator
        // unfortunately this is not actually safe
        // and could be hacked by a sophisticated attacker
        seed = (block.number + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        // first we make sure that you can only wave every 1 minute
        require(
            lastWavedAt[msg.sender] + 1 minutes < block.timestamp,
            "Wait 15 minutes"
        );
        

        //update the time stamp if we've gotten here
        lastWavedAt[msg.sender] = block.timestamp;

        // update the total wave count
        i_totalWaves++;

        // log the message to the console
        console.log("%s has sent a message: %s!", msg.sender, _message);

        // add the message to the waves array
        Wave memory _wave = Wave(msg.sender, _message, block.timestamp);
        waves.push(_wave);

        // update the seed with new difficuly and timestamp and old seed
        seed = (block.difficulty + block.timestamp + seed) % 100;

        // add the message to the other data structures we have saved
        m_messageCountByAddress[msg.sender]++;

        // only award to 50% of the users
        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money then you have"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        // emit message
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // function that returns the total count of waves, regardless of source
    function getTotalMessageCount() view public returns(uint256) {
        console.log("We have had a total of %d waves", i_totalWaves);
        return i_totalWaves;
    }

    // function that returns message count by source 
    // (how many waves were created by a specific address)
    function getMessageCountBySource(address _source) view public returns(uint256) {
        return m_messageCountByAddress[_source];
    }

    // function that returns all the various Wave[] items created
    function getAllWaves() view public returns(Wave[] memory){        
        return waves;
    }



}