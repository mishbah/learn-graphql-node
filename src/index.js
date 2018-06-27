const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')

let links = [{
  id: 'link-0',
  url: 'samplelink.com',
  description: 'Belajar graphql server via node'
}]

let idCount = links.length

function findLinkById(id) {
  console.log(id)
  return links.filter(link => link.id === id)
}

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/hecokede-trimsj/hackernews-node/dev',
      secret: 'mysecret123',
      debug: true,
    })
  })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
