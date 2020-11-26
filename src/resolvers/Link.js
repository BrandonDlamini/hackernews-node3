const { UserDistinctFieldEnum } = require("@prisma/client");

function postedBy(parent, args, context, info){
    return context.prisma.link.findOne({ where: {id: parent.id} }).postedBy()

}

function votes (parent, args, context, info){
    return context.prisma.link.findOne({ where: { id: parent.id}})

}

module.exports = {
    postedBy,
    votes,
}