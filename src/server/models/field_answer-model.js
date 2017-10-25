import { sequelize, Sequelize } from './index-model';
import Item from './item-model';

const FieldAnswer = sequelize.define('FieldAnswer', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    answer_text: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    field_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: 'FieldDefine',
            key: 'pk_id'
        }
    },
    item_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: 'Item',
            key: 'pk_id'
        }
    }
});

Item.hasMany(FieldAnswer, { foreignKey: 'pk_id', sourceKey: 'item_id' });
FieldAnswer.belongsTo(Item, { foreignKey: 'pk_id', targetKey: 'item_id' });

export default FieldAnswer;