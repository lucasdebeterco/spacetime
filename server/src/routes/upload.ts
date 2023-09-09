import {FastifyInstance} from "fastify";

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

        console.log(upload.filename)
    })
}