import { app } from "./app";
const port = process.env["PORT"] || 5500;

const gracefulShutDown = () => {
  // TODO with pool and db
}
process.on("SIGNINT", gracefulShutDown)
process.on("SIGTERM", gracefulShutDown)
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
