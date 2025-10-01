import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { exportUrlsAccessed } from '@/app/services/export-urls-accessed-service'
import { unwrapEither } from '@/shared/either'

export const exportUrlsAccessedRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/url/exports',
    {
      schema: {
        summary: 'Exports accessed URLs',
        tags: ['exports'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            fileUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await exportUrlsAccessed({ searchQuery })

      const { fileUrl } = unwrapEither(result)

      return reply.status(200).send({ fileUrl })
    }
  )
}
