import "dotenv/config";
export const jwtSecret = process.env["JWT_SECRET"] as string;
export const costFactor = Number(process.env["COST_FACTOR"]) as number;
export const superSecret = process.env["SUPER_SECRET"] as string;
