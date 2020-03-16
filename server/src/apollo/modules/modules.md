# Modules

Every folder inside here is concidered a module, they consist of the following:

- `schema.gql`

If in your schema you define either a `Query`, `Mutation` or `Subscription` it expects the resolver to exist in the following files:

- `query.ts`
- `mutation.ts`
- `subscription.ts`

All module files should `export default` an object containing `named` functions as defined in the `schema.gql`.

It will stitch all the modules together as 1 big schema.
