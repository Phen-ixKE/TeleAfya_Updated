const { Sequelize, DataTypes } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('e_pharmacy', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Medication Model
const Medication = sequelize.define('Medication', {
  medication_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  dosage_form: {
    type: DataTypes.STRING(50), // e.g., tablet, capsule, syrup
    allowNull: false
  },
  strength: {
    type: DataTypes.STRING(50) // e.g., 500mg, 50ml
  },
  manufacturer: {
    type: DataTypes.STRING(100)
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  requires_prescription: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Pharmacy Order Model
const PharmacyOrder = sequelize.define('PharmacyOrder', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prescription_id: {
    type: DataTypes.INTEGER
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
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Order Items Model
const OrderItem = sequelize.define('OrderItem', {
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
});

// Set up associations
PharmacyOrder.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(PharmacyOrder, { foreignKey: 'order_id' });
OrderItem.belongsTo(Medication, { foreignKey: 'medication_id' });

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('E-Pharmacy database connection established successfully.');
    
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('E-Pharmacy tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the models and connection
module.exports = {
  sequelize,
  Medication,
  PharmacyOrder,
  OrderItem,
  testConnection
};
