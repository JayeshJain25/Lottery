// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Lottery {

    address public manager;
    address payable[] public players;


    constructor() public {
        manager = msg.sender;
    } 


    function enter() public payable{
           require(msg.value > .01 ether , "Need to send more than 0 ether to enter the game" );
         
           players.push(payable(msg.sender)); 
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))); //keccak256(); can also be used
    }


    function pickWinner() public restrict {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players=new address payable [](0);
    }

    modifier restrict() {
        require(msg.sender == manager, "Only Manager Can Call PickWinner Function");
        _;
    }

    function getPlayers() public view returns(address payable[] memory){
            return players; 
    }


    function getBalance() public view returns (uint) {
      return address(this).balance;
    }


}

