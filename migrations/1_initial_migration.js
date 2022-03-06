const Egg = artifacts.require("Egg");

module.exports = function (deployer) {
  deployer.deploy(Egg);
};
