const { GraphQLServer } = require('graphql-yoga')
const {PrismaClient} = require('@prisma/client')


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
    Query: {

        info: () => `This is the API of a hackerbews Clone`,
        
        feed: async(parent, args, context)=> {
            return context.prisma.link.findMany()
        },
        link: (parent, args)=> {
            
            const linkFound = links.find( link => link.id === args.id);

            return linkFound;
        }
    },

    Mutation: {

        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description:args.description
                },
            })
            
            return newLink
            
        },

        
        updateLink: (root, args) => {
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
            
            }
    
    }
}


const prisma = new PrismaClient()


const server =  new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
        context: request => {
            return{
                ...request,prisma
            }
    }
})

server.start(()=> console.log(`Server is running in http://localhost:4000`))