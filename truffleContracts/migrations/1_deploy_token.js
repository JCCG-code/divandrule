const BEP20Token = artifacts.require("BEP20Token");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(BEP20Token, "Prueba", "PRU", 1000000);
};