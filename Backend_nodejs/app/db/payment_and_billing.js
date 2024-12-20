cd c:\Users\Phenomena.Ekuss\Desktop\gca\TeleAfia\Backend_nodejs
npm install sequelize mysql2const { Sequelize, DataTypes } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('payment_and_billing', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Payment Model
const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  payment_method: {
    type: DataTypes.ENUM('mpesa', 'card', 'bank_transfer'),
    allowNull: false
  },
  transaction_ref: {
    type: DataTypes.STRING(100),
    unique: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  service_type: {
    type: DataTypes.ENUM('appointment', 'pharmacy', 'consultation'),
    allowNull: false
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Invoice Model
const Invoice = sequelize.define('Invoice', {
  invoice_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  invoice_number: {
    type: DataTypes.STRING(50),
    unique: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'overdue', 'cancelled'),
    defaultValue: 'pending'
  },
  due_date: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Define Transaction History Model
const TransactionHistory = sequelize.define('TransactionHistory', {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.ENUM('payment', 'refund', 'adjustment'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('success', 'failed'),
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Set up associations
Payment.hasOne(Invoice, { foreignKey: 'payment_id' });
Invoice.belongsTo(Payment, { foreignKey: 'payment_id' });
Payment.hasMany(TransactionHistory, { foreignKey: 'payment_id' });
TransactionHistory.belongsTo(Payment, { foreignKey: 'payment_id' });

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Payment and Billing database connection established successfully.');
    
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('Payment and Billing tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the models and connection
module.exports = {
  sequelize,
  Payment,
  Invoice,
  TransactionHistory,
  testConnection
};
