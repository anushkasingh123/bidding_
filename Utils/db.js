const Sequelize  = require('sequelize');
require('dotenv').config();



const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false, 
});


const connectDB =async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.')
    
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
}



module.exports = {sequelize,connectDB};