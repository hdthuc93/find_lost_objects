import { sequelize, Sequelize } from './index-model';
import Item from './item-model';
import User from './user-model';

const Note = sequelize.define('Note', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: 'User',
            key: 'pk_id'
        }
    },
    item_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
});

Item.hasMany(Note, { foreignKey: 'pk_id', sourceKey: 'item_id' });
Note.belongsTo(Item, { foreignKey: 'pk_id', targetKey: 'item_id' });

User.hasMany(Note, { foreignKey: 'pk_id', sourceKey: 'user_id' });
Note.belongsTo(User, { foreignKey: 'pk_id', targetKey: 'user_id' });

export default Note;