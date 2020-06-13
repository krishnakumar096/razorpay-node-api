const Sequelize = require("sequelize");
import { appConfig } from "../config/appConfig";
const logger = require("../util/logger");

/**
 * DB Config Values 
 */
const host=appConfig.database.host ,
      db= appConfig.database.dbName,
      port= appConfig.database.dbPort,
      username=appConfig.database.user.name , 
      password=appConfig.database.user.password;

const DBConnection = new Sequelize(db, username, password, {
    host: host,
    port: port,
    dialect: "postgres",
    define: {
        freezeTableName: true
    },
    logging: false
});

DBConnection.authenticate()
.then(() => {
  logger.info(`Db Connection has been established successfully to ${host}:${port}`);
})
.catch(err => {
  logger.error(`Error while Db Connecting to ${host}:${port} \n ${err}`);
});

export {DBConnection};
