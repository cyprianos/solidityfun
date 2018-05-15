const fs = require('fs');

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//interface = AbI
const {interface, bytecode} = require('./compile');
const mnemonic = fs.readFileSync('./mnemonic.secret').toString('utf8');
let infura = fs.readFileSync('./infura.secret').toString('utf8');
infura = `https://rinkeby.infura.io/${infura}`;
console.log('infuralink', infura);


const provider = new HDWalletProvider(
  mnemonic,
  infura
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('accounts', accounts);
  console.log('attempting to deploy from acounts', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({gas: '1000000', from: accounts[0]});

  console.log('Contract deployed to address', result.options.address);
};

deploy();