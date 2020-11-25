function feed(parent , args, context, info){
    return context.prisma.link.findMany()
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