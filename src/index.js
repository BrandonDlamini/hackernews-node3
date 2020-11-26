const { GraphQLServer } = require('graphql-yoga')
const {PrismaClient} = require('@prisma/client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

const {PubSub} = require ('graphql-yoga')

const pubsub = new PubSub()


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'fullstak tutorial for graphql '
},
{
    id: 'link-3',
    url: 'www.royaldesigns.com',
    description: 'full stack digital company  '
}
]

const resolvers ={
    Query,
    Mutation,
    User,
    Link,
    Subscription,
    Vote,
}
   
        /*updateLink: (root, args) => {
            const foundLink = links.find((link)=> link.id === args.id);
             
            if (foundLink.id === args.id) {
                foundLink.description = args.description
                foundLink.url = args.url
            }

            return foundLink;
        },
        deleteLink: (root, args) => {

            const IndexToBeRemoved = links.findIndex((index) =>index.id === args.id );    
            const removedLink =links[IndexToBeRemoved];
            links.splice(IndexToBeRemoved, 1);

            return removedLink
            
            }*/
    
    

const prisma = new PrismaClient()


const server =  new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
        context: request => {
            return{
                ...request,prisma,pubsub
            }
    },
})

server.start(()=> console.log(`Server is running in http://localhost:4000`))