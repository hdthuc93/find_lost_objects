import { sequelize, Sequelize } from './index-model';

const StorageLocation = sequelize.define('StorageLocation', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

export default StorageLocation;