'use strict'

const fastifyJwt = require('@fastify/jwt');
const fp = require('fastify-plugin');

module.exports = fp(function (fastify, opts, done) {
    fastify.register(fastifyJwt, {
        secret: fastify.config.SECRET_KEY
    });

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    })

    done()
})