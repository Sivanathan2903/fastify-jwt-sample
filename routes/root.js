'use strict'

const { Spanner } = require('@google-cloud/spanner');

module.exports = async function (fastify, opts) {
    fastify.post('/token', async (req, reply, payload) => {
        //const token = fastify.jwt.sign({ payload });
        const projectId = 'test-deploy-nodejs-gcp-project';
        const instanceId = 'test-instance';
        const databaseId = 'test-database-1';

        const spanner = new Spanner({ projectId: projectId });

        // Gets a reference to a Cloud Spanner instance and database
        const instance = spanner.instance(instanceId);
        const database = instance.database(databaseId);

        // The query to execute
        const query = {
            sql: 'SELECT *from Personal',
        };

        // Execute a simple SQL statement
        const [rows] = await database.run(query);
        console.log(`Query: ${rows.length} found.`);
        let json = {};
        rows.forEach(row => {
            console.log(row);
            json = row.toJSON();
        });




        reply
            .code(200)
            .send(json);
    });

    fastify.get('/verify', {
        onRequest: [fastify.authenticate]
    }, async function (request, reply) {
        return request.user;
    });
}