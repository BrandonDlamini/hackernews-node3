const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {APP_SECRET, getUserId} = require('../utils')


async function signup(parent, args, context, info){

    const password = await bcrypt.has(args.password, 10)

    const user = await context.prisma.user.create({
        data: {...args, password}
    })

    const token = jwt.sign({userID: user.id}, APP_SECRET)

    return { token, user,}
}

async function login(parent, args, context, info){

    const user = await context.prisma.user.findOne({where: {emai : args.email}})
    if (!user){
        throw new Error('No such User Found ')

    }

    const valid = await bcrypt.compare(args.password, user.password)

    if (!Valid){
    throw new Error('INvalid Password')

    }

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {token, user,}
}

function post(parent, args, context, info) {

    const userID = getUserId(context)

    const newLink = context.prisma.link.create({
        data: {
            url: args.url,
            description:args.description,
            postedBy: {connect: {id: userId}}
        },
    })
    
    return newLink
    
}

module.exports ={
    signup,
    login,
    post 
}