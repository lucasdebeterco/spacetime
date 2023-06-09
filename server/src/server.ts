import 'dotenv/confi'
import fastify from 'fastify'
import cors from '@fastify/cors'
import {memoriesRoutes} from "./routes/memories";
import {authRoutes} from "./routes/auth";

const app = fastify()

app.register(cors, {
    origin: true
})
app.register(memoriesRoutes)
app.register(authRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('👌 HTTP Server Running')
})