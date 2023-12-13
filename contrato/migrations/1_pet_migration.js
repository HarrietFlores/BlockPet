const Mascota = artifacts.require("Mascota");

module.exports = function (deployer) {
  deployer.deploy(Mascota);
};
