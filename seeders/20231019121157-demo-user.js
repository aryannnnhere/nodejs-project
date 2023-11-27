const ethers = require('ethers');
const wallet = ethers.Wallet.createRandom();

const privateKey = wallet.privateKey;  
const publicKey = wallet.address;

const userData = [
  {
    firstName: 'Super-Admin',
    email: 'superAdmin@gmail.com',
    role: 'super-admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    gender:"male",
    publicKey: publicKey,
    companyId : 1,
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log("privateKey => " , privateKey );
    return queryInterface.bulkInsert('Users', userData);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

