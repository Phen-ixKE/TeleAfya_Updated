const { DataTypes } = require('sequelize');
const { ePharmacyDb } = require('../config/database');

const Medication = ePharmacyDb.define('medications', {
  medication_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dosage_form: {
    type: DataTypes.STRING,
    allowNull: false
  },
  strength: {
    type: DataTypes.STRING,
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  requires_prescription: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

const PharmacyOrder = ePharmacyDb.define('pharmacy_orders', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  delivery_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prescription_image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

const OrderItem = ePharmacyDb.define('order_items', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medication_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true
});

// Set up associations
PharmacyOrder.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(PharmacyOrder, { foreignKey: 'order_id' });
OrderItem.belongsTo(Medication, { foreignKey: 'medication_id' });
Medication.hasMany(OrderItem, { foreignKey: 'medication_id' });

async function testConnection() {
  try {
    await ePharmacyDb.authenticate();
    console.log('E-Pharmacy Model: Database connection established successfully.');
    
    await ePharmacyDb.sync({ alter: true });
    console.log('E-Pharmacy Model: Tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  Medication,
  PharmacyOrder,
  OrderItem,
  testConnection
};
