import { ApolloServer, Config } from 'apollo-server'
import { AuthenticationError } from 'apollo-server-core';
import * as jwt from 'jsonwebtoken'
import { makeModulesSchema } from './loader'

const authenticate = async (resolve, root, args, ctx, info) => {
  let token;
  try {
    token = jwt.verify(ctx.request.get('Authorization'), 'secret')
  } catch (e) {
    return new AuthenticationError('Not authorized!')
  }

  ctx.role = token.role
  const result = await resolve(root, args, ctx, info)
  return result
}

export const getApolloServerConfig = async (): Promise<Config> => ({
  schema: await makeModulesSchema(),
  context: req => ({ ...req }),
  playground: {
    settings: {
      'editor.theme': 'dark',
      'editor.cursorShape': 'line',
    },
  },
})

export const getApolloServer = async () => new ApolloServer(await getApolloServerConfig())

export default getApolloServer()
