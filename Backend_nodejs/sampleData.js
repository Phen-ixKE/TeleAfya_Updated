const { User } = require('./app/db/user_management');
const { Appointment } = require('./app/db/appointment_management');
const { MedicalService, DoctorSpecialization } = require('./app/db/medical_services');
const { Medication, PharmacyOrder, OrderItem } = require('./app/db/e_pharmacy');
const { Payment, Invoice, TransactionHistory } = require('./app/db/payment_and_billing');
const { Clinic, ClinicStaff, ClinicEquipment } = require('./app/db/teleafya_clinics');
const { CommunityHealthProvider, CommunityHealthVisit, HealthEducationSession } = require('./app/db/chp_management');

async function createSampleData() {
    try {
        console.log('🌱 Creating sample data...\n');

        // Create Users
        console.log('Creating users...');
        const admin = await User.create({
            email: 'admin@teleafya.com',
            password: 'admin123',
            first_name: 'Admin',
            last_name: 'User',
            phone_number: '+254700000001',
            role: 'admin'
        });

        const doctor = await User.create({
            email: 'doctor@teleafya.com',
            password: 'doctor123',
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '+254700000002',
            role: 'doctor'
        });

        const patient = await User.create({
            email: 'patient@teleafya.com',
            password: 'patient123',
            first_name: 'Jane',
            last_name: 'Smith',
            phone_number: '+254700000003',
            role: 'patient'
        });

        console.log('✅ Users created');

        // Create Clinic
        console.log('\nCreating clinic...');
        const clinic = await Clinic.create({
            name: 'TeleAfya Main Clinic',
            address: 'Nairobi, Kenya',
            phone_number: '+254700000004',
            email: 'clinic@teleafya.com',
            operating_hours: JSON.stringify({
                monday: '8:00-17:00',
                tuesday: '8:00-17:00',
                wednesday: '8:00-17:00',
                thursday: '8:00-17:00',
                friday: '8:00-17:00'
            }),
            services_offered: 'General Practice, Pediatrics, Gynecology'
        });

        // Add doctor to clinic staff
        await ClinicStaff.create({
            clinic_id: clinic.clinic_id,
            user_id: doctor.user_id,
            role: 'doctor',
            schedule: JSON.stringify({
                monday: '9:00-16:00',
                wednesday: '9:00-16:00',
                friday: '9:00-16:00'
            })
        });

        console.log('✅ Clinic and staff created');

        // Create Medical Service
        console.log('\nCreating medical services...');
        const service = await MedicalService.create({
            service_name: 'General Consultation',
            description: 'Basic medical consultation',
            cost: 1000.00,
            duration_minutes: 30,
            department: 'General Practice'
        });

        // Add doctor specialization
        await DoctorSpecialization.create({
            doctor_id: doctor.user_id,
            specialization: 'General Practice',
            certification: 'Medical Board of Kenya',
            years_experience: 5
        });

        console.log('✅ Medical services created');

        // Create Appointment
        console.log('\nCreating appointment...');
        const appointment = await Appointment.create({
            patient_id: patient.user_id,
            doctor_id: doctor.user_id,
            appointment_date: new Date(Date.now() + 86400000), // Tomorrow
            status: 'scheduled',
            reason: 'General checkup'
        });

        console.log('✅ Appointment created');

        // Create Payment and Invoice
        console.log('\nCreating payment and invoice...');
        const payment = await Payment.create({
            user_id: patient.user_id,
            amount: 1000.00,
            payment_method: 'mpesa',
            transaction_ref: 'MPE' + Date.now(),
            status: 'completed',
            service_type: 'appointment',
            service_id: appointment.appointment_id
        });

        await Invoice.create({
            payment_id: payment.payment_id,
            user_id: patient.user_id,
            invoice_number: 'INV' + Date.now(),
            amount: 1000.00,
            status: 'paid',
            due_date: new Date(Date.now() + 604800000), // Week from now
            description: 'Consultation fee'
        });

        console.log('✅ Payment and invoice created');

        // Create Medications
        console.log('\nCreating medications...');
        const medication = await Medication.create({
            name: 'Paracetamol',
            description: 'Pain reliever and fever reducer',
            dosage_form: 'tablet',
            strength: '500mg',
            manufacturer: 'Generic Pharma',
            price: 50.00,
            stock_quantity: 1000,
            requires_prescription: false
        });

        // Create Pharmacy Order
        const order = await PharmacyOrder.create({
            user_id: patient.user_id,
            status: 'completed',
            total_amount: 150.00,
            delivery_address: 'Nairobi, Kenya'
        });

        await OrderItem.create({
            order_id: order.order_id,
            medication_id: medication.medication_id,
            quantity: 3,
            unit_price: 50.00
        });

        console.log('✅ Medications and order created');

        // Create Community Health Provider
        console.log('\nCreating community health provider...');
        const chp = await CommunityHealthProvider.create({
            user_id: doctor.user_id,
            certification_number: 'CHP123',
            area_of_operation: 'Nairobi East',
            experience_years: 5,
            specializations: JSON.stringify(['Community Health', 'First Aid']),
            is_verified: true,
            status: 'active'
        });

        // Create Health Education Session
        await HealthEducationSession.create({
            chp_id: chp.chp_id,
            topic: 'COVID-19 Awareness',
            description: 'Basic information about COVID-19 prevention',
            session_date: new Date(Date.now() + 172800000), // Day after tomorrow
            location: 'Community Center, Nairobi East',
            target_audience: 'General Public',
            status: 'planned'
        });

        console.log('✅ Community health provider and session created');

        console.log('\n🎉 All sample data created successfully!');

    } catch (error) {
        console.error('❌ Error creating sample data:', error);
    }
}

// Run the sample data creation
console.log('🚀 TeleAfya Sample Data Creation');
console.log('===============================\n');
createSampleData()
    .then(() => console.log('\n✨ Sample data creation completed'))
    .catch(err => console.error('❌ Fatal error:', err));
