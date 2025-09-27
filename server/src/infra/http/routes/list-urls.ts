import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { listUrls } from '@/app/services/list-urls-service'
import { unwrapEither } from '@/shared/either'

export const listUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/urls',
    {
      schema: {
        summary: 'List URLs',
        tags: ['urls'],
        response: {
          200: z.object({
            urls: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.string(),
                shortenedUrl: z.string(),
                accessCount: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (_request, reply) => {
      const result = await listUrls()

      const { urls } = unwrapEither(result)

      return reply.status(200).send({ urls })
    }
  )
}
