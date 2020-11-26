const { getUserId } = require("../utils");

async function vote(parent, args, context, info){

    const userId = getUserId(context)

    const vote = await context.prisma.vote.findOne({
        where: {
            linkId_userId: {
                linkId: Number(args.linkId),
                userId: userId
            }
        }
    })

    if (Boolean (vote)) {
        throw new Error(`Already voted for link: ${args.linkId}`)
    }

    const newVote = context.prisma.vote.create({
        data: {
            user: { connect: { id: userId }},
            link: { connect: { id: Number(args.linkId) } },
        }
    })

    context.pubsub.publish("NEW_VOTE", newVote)

    return newVote
}