import { lstatSync, readdirSync, readFileSync } from 'fs'
import { join, parse, basename } from 'path'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
const isDirectory = (path: string): boolean => lstatSync(path).isDirectory()
const isResolver = (path: string): boolean => /modules\/[a-z].+\/(?:query|mutation|subscription)\./.test(path)
const isSchema = (path: string): boolean => /schema\.(?:gql|graphql)/.test(basename(path))

const walkDirectory = (path: string): string[] => readdirSync(path).map(source => join(path, source))
const getModules = (): string[] => walkDirectory(__dirname + '/modules').filter(isDirectory)
const loadSchema = (path: string): string => readFileSync(path, 'utf8')

const loadResolver = (path: string): Promise<any> =>
  import(path).then(resolver => ({
    [capitalize(parse(path).name)]: resolver.default,
  }))

const makeModuleSchema = async (path: string) =>
  makeExecutableSchema({
    typeDefs: walkDirectory(path)
      .filter(isSchema)
      .map(schema => loadSchema(schema)),
    resolvers: await Promise.all(
      walkDirectory(path)
        .filter(isResolver)
        .map(file => loadResolver(file)),
    )
      .then(resolvers => {
        const [...resolver] = resolvers
        return resolver
      })
      .catch(err => {
        throw new Error(err)
      }),
  })

export const makeModulesSchema = async () =>
  mergeSchemas({
    schemas: await Promise.all(getModules().map(mod => makeModuleSchema(mod))).catch(err => {
      throw new Error(err)
    }),
  })
