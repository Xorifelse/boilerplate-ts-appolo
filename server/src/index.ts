import Apollo from './apollo'

const start = async () => {
  // const http = express()
  const port = parseInt(process.env.PORT) || 4000
  // http.get('/', (req, res) => {
  //   res.send('Hello World')
  // })

  // http.listen(port, () => {
  //   console.log(`🚀 Express server ready at http://localhost:${port}/`)
  // })

  Apollo.then(server =>
    server.listen({
      port
    }).then(({ url }) => {
      console.log(`🚀 Apollo server ready at ${url}`)
    }),
  )
}

start()
