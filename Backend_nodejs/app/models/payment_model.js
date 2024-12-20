const { DataTypes } = require('sequelize');
const { paymentAndBillingDb } = require('../config/database');

const Payment = paymentAndBillingDb.define('payments', {
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
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  service_type: {
    type: DataTypes.ENUM('appointment', 'pharmacy', 'subscription'),
    allowNull: false
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

const Invoice = paymentAndBillingDb.define('invoices', {
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
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
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
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

const TransactionHistory = paymentAndBillingDb.define('transaction_history', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

// Set up associations
Payment.hasOne(Invoice, { foreignKey: 'payment_id' });
Invoice.belongsTo(Payment, { foreignKey: 'payment_id' });
Payment.hasMany(TransactionHistory, { foreignKey: 'payment_id' });
TransactionHistory.belongsTo(Payment, { foreignKey: 'payment_id' });

async function testConnection() {
  try {
    await paymentAndBillingDb.authenticate();
    console.log('Payment Model: Database connection established successfully.');
    
    await paymentAndBillingDb.sync({ alter: true });
    console.log('Payment Model: Tables synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  Payment,
  Invoice,
  TransactionHistory,
  testConnection
};
