import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { deletelUrl } from '@/app/services/delete-url-service'
import { isRight, unwrapEither } from '@/shared/either'

export const deleteUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/url/:shortenedUrl',
    {
      schema: {
        summary: 'Delete URL',
        tags: ['urls'],
        params: z.object({
          shortenedUrl: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = request.params

      const result = await deletelUrl({ shortenedUrl })

      if (isRight(result)) {
        const { id } = unwrapEither(result)

        return reply.status(200).send({ id })
      }

      const error = unwrapEither(result)

      return reply.status(404).send({ message: error.message })
    }
  )
}
