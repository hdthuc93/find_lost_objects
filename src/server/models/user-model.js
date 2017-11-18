import { sequelize, Sequelize } from './index-model';
import bcrypt from "bcrypt";

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

User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, bcrypt.genSaltSync(8))
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            console.log(err);
        });
});

User.prototype.validPassword = async function(password, callback) {
    console.log(password);
    console.log(this.password);
  return bcrypt.compare(password, this.password, callback);
};

export default User;