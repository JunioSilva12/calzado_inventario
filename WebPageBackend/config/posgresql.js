
//const { Pool} = require('pg')
//const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('@prisma/client')




const prisma = new PrismaClient();

const dbConnectPostgresql = async () => {
    try {
      await prisma.$connect();
      console.log("Connected to PostgreSQL with Prisma");
    } catch (error) {
      console.error("Error connecting to PostgreSQL with Prisma", error);
    }
  };


module.exports = { dbConnectPostgresql , prisma}