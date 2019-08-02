-- Drops the donationdb if it already exists --
DROP DATABASE IF EXISTS donation_db;

-- Created the DB "donationdb" (only works on local connections)
CREATE DATABASE donation_db;

-- Use the DB donationdb for all the rest of the script
USE donation_db;
