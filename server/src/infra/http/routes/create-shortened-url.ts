import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createShortenedUrl } from '@/app/services/create-shortened-url-service'
import { isRight, unwrapEither } from '@/shared/either'

export const createShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/url',
    {
      schema: {
        summary: 'Create a shortened URL',
        tags: ['urls'],
        body: z.object({
          originalUrl: z.url(),
          shortenedUrlSuffix: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            originalUrl: z.string(),
            shortenedUrl: z.string(),
            accessCount: z.number(),
            createdAt: z.string(),
          }),
          400: z.object({ message: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('URL already exists.'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortenedUrlSuffix } = request.body

      const result = await createShortenedUrl({
        originalUrl,
        shortenedUrlSuffix,
      })

      if (isRight(result)) {
        const createdUrl = unwrapEither(result)

        return reply.status(201).send(createdUrl)
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'InvalidUrl':
          return reply.status(400).send({ message: error.message })
        case 'UrlAlreadyExists':
          return reply.status(409).send({ message: error.message })
      }
    }
  )
}
