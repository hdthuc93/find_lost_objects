import { sequelize, Sequelize } from './index-model';
import StorageLocation from './storage_location-model';
import Category from './category-model';
import Locations from './location-model';

const Item = sequelize.define('Item', {
    pk_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    location_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    other_details: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    lost_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email_address: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    contact_phone_no: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    create_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    match_item_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    storege_location_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }
});

StorageLocation.hasMany(Item, { foreignKey: 'storege_location_id', sourceKey: 'pk_id' });
Item.belongsTo(StorageLocation, { foreignKey: 'storege_location_id', targetKey: 'pk_id' });

Category.hasMany(Item, { foreignKey: 'category_id', sourceKey: 'pk_id' });
Item.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'pk_id' });

Locations.hasMany(Item, { foreignKey: 'location_id', sourceKey: 'pk_id' });
Item.belongsTo(Locations, { foreignKey: 'location_id', targetKey: 'pk_id' });

export default Item;