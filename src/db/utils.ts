import { query } from "."; // Adjust the import path to your actual db module

export const truncateTable = async (tableName: string): Promise<void> => {
  await query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
};
