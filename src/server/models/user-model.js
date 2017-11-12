import { sequelize, Sequelize } from './index-model';

const User = sequelize.define('User', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    user_type: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

export default User;