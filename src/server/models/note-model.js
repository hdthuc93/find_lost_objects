import { sequelize, Sequelize } from './index-model';
import Item from './item-model';
import User from './user-model';

const Note = sequelize.define('Note', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    item_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
});

Item.hasMany(Note, { foreignKey: 'item_id', sourceKey: 'pk_id' });
Note.belongsTo(Item, { foreignKey: 'item_id', targetKey: 'pk_id' });

User.hasMany(Note, { foreignKey: 'user_id', sourceKey: 'pk_id' });
Note.belongsTo(User, { foreignKey: 'user_id', targetKey: 'pk_id' });

export default Note;