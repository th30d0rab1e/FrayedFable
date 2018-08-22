-- CREATE TABLE "users" (
-- "id" serial primary key,
-- "username" varchar(20) not null UNIQUE,
-- "password" varchar(240) not null
-- );

-- CREATE TABLE "userprofileinformation" (
-- "id" serial primary key,
-- "user_id" integer references users not null,
-- "firstname" varchar(40) not null,
-- "lastname" varchar (40) not null,
-- "address" varchar(5000) not null UNIQUE,
-- longitude decimal (12,9) not null,
-- latitude  decimal (12,9) not null,
-- householdsize int not null,
-- phonenumber bigint UNIQUE
-- );


-- -CREATE TABLE "userneeds" (
-- "id" serial primary key,
-- "user_id" integer references users not null,
-- "Need" varchar(100) not null,
-- "Groceries" varchar(1000),
-- "Clothing" varchar(1000)

-- );

-- );
