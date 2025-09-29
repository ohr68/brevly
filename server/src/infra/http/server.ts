import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '@/env'
import { createShortenedUrlRoute } from './routes/create-shortened-url'
import { deleteUrlRoute } from './routes/delete-url'
import { exportUrlsAccessedRoute } from './routes/export-urls-accessed'
import { getOriginalUrlRoute } from './routes/get-original-url'
import { incrementAccessCountRoute } from './routes/increment-access-count'
import { listUrlsRoute } from './routes/list-urls'
import { transformSwaggerSchema } from './transform-swagger-schema'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly Server',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(getOriginalUrlRoute)
server.register(createShortenedUrlRoute)
server.register(incrementAccessCountRoute)
server.register(listUrlsRoute)
server.register(exportUrlsAccessedRoute)
server.register(deleteUrlRoute)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('🚀 HTTP Server Running!!')
})
