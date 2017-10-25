import { sequelize, Sequelize } from './index-model';
import StorageLocation from './storage_location-model';
import Category from './category-model';
import Location from './location-model';

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
        type: "LONGBLOB",
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

StorageLocation.hasMany(Item, { foreignKey: 'pk_id', sourceKey: 'storege_location_id' });
Item.belongsTo(StorageLocation, { foreignKey: 'pk_id', targetKey: 'storege_location_id' });

Category.hasMany(Item, { foreignKey: 'pk_id', sourceKey: 'category_id' });
Item.belongsTo(Category, { foreignKey: 'pk_id', targetKey: 'category_id' });

Location.hasMany(Item, { foreignKey: 'pk_id', sourceKey: 'location_id' });
Item.belongsTo(Location, { foreignKey: 'pk_id', targetKey: 'location_id' });

export default Item;