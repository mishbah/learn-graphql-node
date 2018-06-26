const { GraphQLServer } = require('graphql-yoga')

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
  Query: {
    info: () => `This is the API of Hackernews Clone`,
    feed: () => links,
    hello: (root, args) => {
      return `${args.name}`
    },
    link: (root, args) => {
      const link = findLinkById(args.id)
      return link[0]
    },
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    deleteLink: (root, args) => {
      const link = findLinkById(args.id)
      const result = link[0]
      links.splice(links.indexOf(result), 1)
      return result
    },
    updateLink: (root, args) => {
      const link = findLinkById(args.id)
      const result = link[0]
      const index = links.indexOf(result)
      const newLink = {
        id: result.id,
        url: args.url,
        description: args.description,
      }
      links[index] = newLink
      return newLink
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))