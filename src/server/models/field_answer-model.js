import { sequelize, Sequelize } from './index-model';
import Item from './item-model';
import FieldDefine from './field_define-model';

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
        allowNull: false
    },
    item_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
});

Item.hasMany(FieldAnswer, { foreignKey: 'item_id', sourceKey: 'pk_id' });
FieldAnswer.belongsTo(Item, { foreignKey: 'item_id', targetKey: 'pk_id' });

FieldDefine.hasMany(FieldAnswer, { foreignKey: 'field_id', sourceKey: 'pk_id' });
FieldAnswer.belongsTo(FieldDefine, { foreignKey: 'field_id', targetKey: 'pk_id' });

export default FieldAnswer;