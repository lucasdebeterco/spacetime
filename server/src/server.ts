import 'dotenv/config'
import fastify from 'fastify'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import jwt from "@fastify/jwt"
import { memoriesRoutes } from "./routes/memories"
import { authRoutes } from "./routes/auth"
import { uploadRoutes } from "./routes/upload"

const app = fastify()

app.register(multipart)

app.register(cors, {
    origin: true
})
app.register(jwt, {
    secret: 'spacetime'
})
app.register(memoriesRoutes)
app.register(authRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('👌 HTTP Server Running')
})