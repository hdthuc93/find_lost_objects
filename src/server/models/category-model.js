import { sequelize, Sequelize } from './index-model';

const Category = sequelize.define('Category', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

export default Category;