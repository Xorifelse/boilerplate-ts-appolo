// import * as bcrypt from 'bcryptjs'
// import * as jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET as string

export interface IMutationLoginArgs {
  email: string
  password: string
}

export const signup = async (_parent: any, _args: any, _ctx: any) => {
  console.log(_ctx)
  return {
    token: 'world',
  }
  // const password = await bcrypt.hash(args.password, 10)
  // const user = await ctx.prisma.createUser({ ...args, password })

  // return {
  //   token: jwt.sign({ userId: user.id }, JWT_SECRET),
  //   user,
  // }
}

export const signin = async (_parent: any, { email, password }: IMutationLoginArgs, _ctx: any) => {
  console.log(email, password)
  return {
    token: 'hello',
  }
  // const user = await ctx.prisma.user({ email })
  // if (!user) {
  //   throw new Error(`No such user found for email: ${email}`)
  // }

  // const valid = await bcrypt.compare(password, user.password)
  // if (!valid) {
  //   throw new Error('Invalid password')
  // }

  // return {
  //   token: jwt.sign({ userId: user.id }, JWT_SECRET),
  //   user,
  // }
}

export default {
  signin,
  signup,
}
