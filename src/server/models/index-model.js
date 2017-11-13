import Sequelize from 'sequelize';
import config from '../configs/const';

const sequelize = new Sequelize(config.nameDB, config.userDB, config.passwordDB, {
    host: config.hostDB,
    dialect: 'mysql',
    port: config.portDB,
    define: {
        freezeTableName: true,
        timestamps: false
    },
    operatorsAliases: false   
});

export { sequelize, Sequelize };