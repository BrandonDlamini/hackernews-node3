const { GraphQLServer } = require('graphql-yoga')


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
        feed: ()=> links,
        link: (parent, args)=> {
            
            const linkFound = links.find( link => link.id === args.id);

            return linkFound;
        }
    },

    Mutation: {

        
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





const server =  new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(()=> console.log(`Server is running in http://localhost:4000`))