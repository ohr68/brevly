import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getOriginalUrl } from '@/app/services/get-original-url-service'
import { isRight, unwrapEither } from '@/shared/either'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/url/original/:shortenedUrl',
    {
      schema: {
        summary: 'Get original URL',
        tags: ['urls'],
        params: z.object({
          shortenedUrl: z.url(),
        }),
        response: {
          200: z.object({
            originalUrl: z.url(),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = request.params

      const result = await getOriginalUrl({ shortenedUrlSuffix: shortenedUrl })

      if (isRight(result)) {
        const { originalUrl } = unwrapEither(result)

        return reply.status(200).send({ originalUrl })
      }

      const error = unwrapEither(result)

      return reply.status(404).send({ message: error.message })
    }
  )
}
