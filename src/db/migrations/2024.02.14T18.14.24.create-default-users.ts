import bcrypt from "bcrypt";
import { costFactor } from "./../../utils/const.utils";
import { Migration } from "../scripts/dbMigrate";
import { currentDateFormated } from "../../utils/currentDate";

export const up: Migration = async (params) => {
  let created = currentDateFormated();
  let password = await bcrypt.hash("supersecret", costFactor);
  params.context.query(
    `INSERT INTO users (username,email, password, role, createdat, updatedat) VALUES ('admin','admin@mail.com', '${password}', 'admin', '${created}', '${created}'), ('user','user@mail.com', '${password}', 'user', '${created}', '${created}');`
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DELETE FROM users
  WHERE email IN ('admin@mail.com');`);
};
