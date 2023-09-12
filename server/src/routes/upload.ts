import { FastifyInstance } from 'fastify'
import { extname, resolve } from 'path'
import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { promisify } from 'util'
import { pipeline } from 'stream'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
    app.post('/upload', async (request, reply) => {
        const upload = await request.file({
            limits: {
                fileSize: 5 * 1024 * 1024, // 5 MB
            },
        })

        if (!upload) {
            return reply.status(400).send()
        }

        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

        if (!isValidFileFormat) {
            return reply.status(400).send()
        }

        const fileId = randomUUID()
        const extension = extname(upload.filename)

        const fileName = fileId.concat(extension)

        const writeStream = createWriteStream(
            resolve(__dirname, '../../uploads/', fileName)
        )

        await pump(upload.file, writeStream)

        return { ok: true }
    })
}