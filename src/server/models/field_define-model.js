import { sequelize, Sequelize } from './index-model';
import Category from './category-model';

const FieldDefine = sequelize.define('FieldDefine', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    field_label: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    help_text: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    is_required: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    category_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    display_order: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
});

Category.hasMany(FieldDefine, { foreignKey: 'category_id', sourceKey: 'pk_id' });
FieldDefine.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'pk_id' });

export default FieldDefine;