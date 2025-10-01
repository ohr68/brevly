import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { incrementAccessCount } from '@/app/services/increment-access-count-service'
import { isRight, unwrapEither } from '@/shared/either'

export const incrementAccessCountRoute: FastifyPluginAsyncZod =
  async server => {
    server.patch(
      '/url/:shortenedUrlSuffix',
      {
        schema: {
          summary: 'Increment URL access count',
          tags: ['urls'],
          params: z.object({
            shortenedUrlSuffix: z.string(),
          }),
          response: {
            204: z.null(),
            404: z.object({ message: z.string() }),
          },
        },
      },
      async (request, reply) => {
        const { shortenedUrlSuffix } = request.params

        const result = await incrementAccessCount({
          shortenedUrlSuffix,
        })

        if (isRight(result)) {
          return reply.status(204).send()
        }
        const error = unwrapEither(result)

        return reply.status(404).send({ message: error.message })
      }
    )
  }
