-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS user_management;

-- Create the user if it doesn't exist
CREATE USER IF NOT EXISTS 'teleafyabackend'@'localhost' IDENTIFIED BY 'teleafyabackend';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON user_management.* TO 'teleafyabackend'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;
