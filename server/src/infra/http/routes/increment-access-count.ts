import { incrementAccessCount } from "@/app/services/increment-access-count-service";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const incrementAccessCountRoute: FastifyPluginAsyncZod = async server => {
    server.patch(
        '/url',
        {
            schema: {
                summary: 'Increment URL access count',
                tags: ['urls'],
                params: z.object({
                    shortenedUrl: z.url(),
                }),
                response: {
                    204: z.object({ shortenedUrl: z.string() }),
                    404: z.object({ message: z.string() }),
                }
            }
        },
        async (request, reply) => {
            const { shortenedUrl } = request.params

            const result = await incrementAccessCount({ shortenedUrl })

            if (isRight(result)) {
                return reply.status(204).send()
            }

            const error = unwrapEither(result)

            return reply.status(404).send({ message: error.message })
        }
    )
}