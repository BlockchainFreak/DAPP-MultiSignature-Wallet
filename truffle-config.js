const path = require('path')
const fs = require('fs')
const provider = require('@truffle/hdwallet-provider')

const privateKeys = JSON.parse(
  fs.readFileSync('secret.json').toString().trim()
)

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts "),

  networks: {
    kovan: {
      provider: () => new provider(
        privateKeys.keys,
        "https://kovan.infura.io/v3/b745047732b94fb1ae511c37d67135ce",
        0, // start from 0 idx
        3, // generate 3 private addresses
      ),
      network_id: 42,
    },
    


    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 7545,            // Standard Ethereum port (default: none)
    //  network_id: "5777",       // Any network (default: none)
    // },
    // test: {
    //   host: "127.0.0.1",     // Localhost (default: none)
    //   port: 7545,            // Standard Ethereum port (default: none)
    //   network_id: "5777",       // Any network (default: none)
    // },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.11",
    }
  },
};
