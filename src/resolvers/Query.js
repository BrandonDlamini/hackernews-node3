async function feed(parent, args, context, info) {
    const where = args.filter
      ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
      : {}
  
    const links = await context.prisma.link.findMany({
      where,
    })
  
    return links
  }


function info (parent, args, context, info){
    return `this is the api of a hackernews Clone`
}

function link(parent, args, context, info){

    return context.prisma.link.find(args.id)
    /*const linkFound = links.find(link => link.id === args.id); */

    return linkFound
}



module.exports = {
    feed, link, info
}