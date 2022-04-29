const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');


const {interface , bytecode} = require('./compile');

const provider =  new HDWalletProvider(
    "size any below beef bonus lens tide ripple sick super cave penalty",
    "https://rinkeby.infura.io/v3/bceeda8849474e3a84d631aa7b223461"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ' , accounts[0]);

   const result = await new web3.eth.Contract(interface)
    .deploy({ data : bytecode})
    .send({gas: '1000000' , from : accounts[0]});

    console.log('Contract Deployed To ' , result.options.address);

};

deploy();