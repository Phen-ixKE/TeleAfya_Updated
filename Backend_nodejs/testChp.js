const { Chp, testConnection } = require('./app/models/user_models/chp_model');

async function testChpModel() {
    try {
        // Test database connection
        await testConnection();

        // Create a test CHP
        const testChp = await Chp.create({
            name: 'Test CHP',
            email: 'testchp@teleafya.com',
            phoneNumber: '+254700000001',
            idNumber: 'CHP001',
            password: 'hashedpassword123'
        });

        console.log('✅ Test CHP created:', testChp.toJSON());

        // Test finding the CHP
        const foundChp = await Chp.findOne({
            where: { email: 'testchp@teleafya.com' }
        });

        console.log('✅ Found CHP:', foundChp ? 'Yes' : 'No');

    } catch (error) {
        console.error('❌ Error testing CHP model:', error);
    }
}

console.log('🚀 Testing CHP Model');
console.log('===================\n');
testChpModel()
    .then(() => console.log('\n✨ CHP test completed'))
    .catch(err => console.error('❌ Fatal error:', err));
