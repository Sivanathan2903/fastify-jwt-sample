'use strict'

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/env'), {
        confKey: 'config',
        schema: {
            type: 'object',
            required: ['SECRET_KEY'],
            properties: {
                SECRET_KEY: {
                    type: 'string'
                }
            }
        },
        dotenv: true
    })
})
