-- Create all necessary databases
CREATE DATABASE IF NOT EXISTS user_management;
CREATE DATABASE IF NOT EXISTS appointment_management;
CREATE DATABASE IF NOT EXISTS chp_management;
CREATE DATABASE IF NOT EXISTS e_pharmacy;
CREATE DATABASE IF NOT EXISTS medical_services;
CREATE DATABASE IF NOT EXISTS payment_and_billing;
CREATE DATABASE IF NOT EXISTS teleafya_clinics;
CREATE DATABASE IF NOT EXISTS file_management;

-- Create the user if it doesn't exist
CREATE USER IF NOT EXISTS 'teleafyabackend'@'localhost' IDENTIFIED BY 'teleafyabackend';

-- Grant privileges to the user for all databases
GRANT ALL PRIVILEGES ON user_management.* TO 'teleafyabackend'@'localhost';
GRANT ALL PRIVILEGES ON appointment_management.* TO 'teleafyabackend'@'localhost';
GRANT ALL PRIVILEGES ON chp_management.* TO 'teleafyabackend'@'localhost';
GRANT ALL PRIVILEGES ON e_pharmacy.* TO 'teleafyabackend'@'localhost';
GRANT ALL PRIVILEGES ON medical_services.* TO 'teleafyabackend'@'localhost';
GRANT ALL PRIVILEGES ON payment_and_billing.* TO 'teleafyabackend'@'localhost';
GRANT ALL PRIVILEGES ON teleafya_clinics.* TO 'teleafyabackend'@'localhost';
GRANT ALL PRIVILEGES ON file_management.* TO 'teleafyabackend'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;
