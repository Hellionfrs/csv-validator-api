import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(5) NOT NULL DEFAULT 'user',
    age INTEGER CHECK (age > 0) DEFAULT NULL,
    createdAt VARCHAR(25) NOT NULL,
    updatedAt VARCHAR(25) NOT NULL,
    CONSTRAINT chk_role CHECK (role IN ('user', 'admin'))
);`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE users;`);
};