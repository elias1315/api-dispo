import * as dotenv from 'dotenv'
dotenv.config();

export const env = {
    dbEnvironment: process.env.DB_ENVIRONMENT || 'development',
    dbHost1: process.env.DB_HOST_1 || '',
    dbUser1: process.env.DB_USER_1 || '',
    dbPass1: process.env.DB_PASS_1 || '',
    dbPort1: parseInt(process.env.DB_PORT_1) || 3306,
    dbApis: process.env.DB_APIS || '',
    dbCerbero: process.env.DB_CERBERO || '',
    dbHotel: process.env.DB_HOTEL || '',

    dbEnvironmentMongo: process.env.DB_ENVIRONMENTMONGO || '',
    dbHostMongo: process.env.DB_HOST_MONGO || '',
    dbUserMongo: process.env.DB_USERMONGO || '',
    dbPassMongo: process.env.DB_PASSMONGO || '',
    dbUserMongoDev: process.env.DB_USERMONGO_DEV || '',
    dbPassMongoDev: process.env.DB_PASSMONGO_DEV || '',
    dbPuertoMongo: parseInt(process.env.DB_PORT_MONGO) || 3306,
    dbChannelMongo: process.env.DB_CHANNEL_MONGO || '',

    //dbUrlMongo:process.env.URL_MONGO,
    //dbUrlMongoDev:process.env.URL_MONGO_DEV,

    //dbNameTarifaChannelMongo:process.env.DB_TABLECHANNELMONGO,
    //dbNameRestriccionRateMongo:process.env.DB_TABLERESTRICCIONMONGO
    

  };