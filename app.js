'use strict'

const fastify = require('fastify')({
    logger: true
})

const path = require('path')
const AutoLoad = require('@fastify/autoload')

const fastifyServer = async (opts) => {
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'config'),
        options: Object.assign({}, opts)
    })

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })

    return fastify;
}

fastifyServer().then((fastifyObj) => {
    fastifyObj.listen({ port: 8081 }, (err) => {
        console.error(err);
    });
}).catch((err) => {
    console.log(err);
})