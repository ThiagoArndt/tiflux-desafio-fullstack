import Fastify from "fastify";
import cors from "@fastify/cors"
import dotenv from "dotenv"
import { routes } from "./routes";

dotenv.config();


const app = Fastify({logger: true})
const PORT = Number(process.env.PORT ?? 3000)

const start = async () => {
  
  await app.register(cors)
  await app.register(routes);

  try{
    await app.listen({port: PORT})
  }
  catch(e){
    process.exit(1)
  }
}

start()