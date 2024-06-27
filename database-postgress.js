import { randomUUID } from "crypto"
import { sql } from "./db.js"


export class DataBase {
    #Clientes = new  Map()


    async  list(search) {
        let cliente

        if (search) { 
            cliente = await sql`select * from clientes where nome ilike ${'%' +search+ '%'}`
        } else {
            cliente = await sql`select * from clientes`
        }

        return cliente
    }

    async create(cliente) {
        const clienteid = randomUUID()
        const { Nome, Idade } = cliente

        await sql `insert into clientes (id, nome, idade) VALUES (${clienteid}, ${Nome}, ${Idade})`
    }

    async update(id, cliente) {
        const { Nome, Idade } = cliente

        await sql `update clientes set nome = ${Nome}, idade = ${Idade} WHERE id = ${id}`

    }

    async delete(id) {
        await sql `delete from clientes where id = ${id}`

    }

}