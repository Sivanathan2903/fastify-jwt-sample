'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/signup', (req, reply, payload) => {
        const token = fastify.jwt.sign({ payload });
        reply
            .code(200)
            .send(token);
    });

    fastify.get('/protected', {
        onRequest: [fastify.authenticate]
    },
        async function (request, reply) {
            return request.user;
        }
    )
}