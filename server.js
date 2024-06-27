import { fastify } from "fastify";
import { DataBase } from "./database-postgress.js";
import { resolveUrl } from "ajv/dist/compile/resolve.js";

const server = fastify()

const database = new DataBase()
const teste = "opa"


server.post('/clientes', async (request, reply) => {
    const {Nome, Idade} = request.body

    await database.create({
        Nome,
        Idade
    })

    return reply.status(201).send()

})

server.get('/clientes', async (request) => {
    const search = request.query.search

    const clientes = await database.list(search)

    return clientes
})

server.put('/clientes/:id', async (request, reply) => {
    const clienteid = request.params.id
    const {Nome, Idade} = request.body

    await database.update(clienteid, {
        Nome,
        Idade,

    })

    return reply.status(204).send()
})

server.delete('/clientes/:id', async (request, reply) => {
    const clienteid = request.params.id

    await database.delete(clienteid)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})