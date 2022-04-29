const path = require('path');
const fs = require('fs');
const solc = require('solc');

const LotteryPath = path.resolve(__dirname , 'contracts' , 'Lottery.sol');
const source = fs.readFileSync(LotteryPath , 'utf8');


var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

var output = JSON.parse(solc.compile(JSON.stringify(input)));

//console.log(output.contracts['Inbox.sol'][':Inbox']);

const interface = output.contracts['Lottery.sol']['Lottery'].abi;
const bytecode = output.contracts['Lottery.sol'] ['Lottery'].evm.bytecode.object;

module.exports = {
    interface,
    bytecode,
};





