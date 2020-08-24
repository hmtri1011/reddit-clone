import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'

import { Post } from './entities/Post'
import microConfig from './mikro-orm.config'

import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'

const main = async () => {
  // connect DB
  const orm = await MikroORM.init(microConfig)
  // run migrations
  await orm.getMigrator().up()

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  })

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('Server started on localhost:4000')
  })
}

main().catch(err => console.log('ERROR: ', err))
