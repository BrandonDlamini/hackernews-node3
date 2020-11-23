const { GraphQLServer } = require('graphql-yoga')


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'fullstak tutorial for graphql '
}
]

let idCount = links.length 

/*const resolvers = {
    Query: {
        info: () => `This is the API of a hackerbews Clone`,
        feed: ()=> links,
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)

            return link
        }
    }
}
*/


const resolvers ={
    Query: {
        link: (parent, args)=> {
            
            const linkFound = links.find( link => link.id === args.id);

            return linkFound;
        }
    }
}


const server =  new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(()=> console.log(`Server is running in http://localhost:4000`))