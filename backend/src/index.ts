import Fastify from "fastify";
import cors from "@fastify/cors"
import middie from "@fastify/middie";
import dotenv from "dotenv"
import { routes } from "./routes";

dotenv.config();


const app = Fastify({logger: true})
const PORT = Number(process.env.PORT ?? 3000)

const start = async () => {
  
  await app.register(cors)
  await app.register(routes);
  await app.register(middie);
  
  try{
    await app.listen({port: PORT})
  }
  catch(e){
    process.exit(1)
  }
}

start()