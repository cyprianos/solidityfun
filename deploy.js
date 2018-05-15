const fs = require('fs');

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//interface = AbI
const {interface, bytecode} = require('./compile');
const mnemonic = fs.readFileSync('./mnemonic.secret').toString('utf8');
const infura = fs.readFileSync('./infura.secret').toString('utf8');

const provider = new HDWalletProvider(
  mnemonic,
  `https://rinkeby.infura.io/${infura}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('attempting to deploy from acounts', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({gas: '10000000', from: accounts[0]});

  console.log('Contract deployed to address', result.options.address);
};

deploy();