import { sequelize, Sequelize } from './index-model';
import Item from './item-model';
import Note from './note-model';

const TrackItem = sequelize.define('TrackItem', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    log_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    action: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    more_detail: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    item_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    note_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }
});

Item.hasMany(TrackItem, { foreignKey: 'pk_id', sourceKey: 'item_id' });
TrackItem.belongsTo(Item, { foreignKey: 'pk_id', targetKey: 'item_id' });

Note.hasMany(TrackItem, { foreignKey: 'pk_id', sourceKey: 'note_id' });
TrackItem.belongsTo(Note, { foreignKey: 'pk_id', targetKey: 'note_id' });

export default TrackItem;