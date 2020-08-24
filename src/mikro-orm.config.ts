import { MikroORM } from '@mikro-orm/core'
import { Post } from './entities/Post'
import { __prod__ } from './constants'

import path from 'path'

export default {
  migrations: {
    path: path.join(__dirname, './migration'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/ // regex pattern for the migration files
  },
  entities: [Post],
  dbName: 'lireddit',
  user: 'postgres',
  password: 'password',
  debug: !__prod__,
  type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0]

// as const mean for more specific: example type will be "postgresql" instead of "string"
// as Parameters<typeof MikroORM.init>[0]: this object is first paramater of MikroORM.init function
// mean it will hint what is the config contains
