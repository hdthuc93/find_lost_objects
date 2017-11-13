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

Item.hasMany(TrackItem, { foreignKey: 'item_id', sourceKey: 'pk_id' });
TrackItem.belongsTo(Item, { foreignKey: 'item_id', targetKey: 'pk_id' });

Note.hasMany(TrackItem, { foreignKey: 'note_id', sourceKey: 'pk_id' });
TrackItem.belongsTo(Note, { foreignKey: 'note_id', targetKey: 'pk_id' });

export default TrackItem;