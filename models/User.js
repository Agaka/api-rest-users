const knex = require("../database/connection")
const bcrypt = require("bcrypt")

class User {

    async findAll() {
        try{
            const result = await knex.select("id", "name", "email", "role").table("users")   
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async findById(id) {
        try{
            const result = await knex.select("id", "name", "email", "role").where({id}).table("users")
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async createUser(name, email, password) {
        try {
            const hash = await bcrypt.hash(password, 10)

            await knex.insert({name, email, password: hash, role: 0}).table("users")
        } catch (err) {
            console.log(err)
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select("email").from("users").where({email})
            
            if(result.length > 0) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async update(id, name, email, role) {
        const user = await this.findById(id)
        if (user.length > 0) {
            const editUser = {}

            if (email) {
                if(email != user.email) {
                    const result = await this.findEmail(email)

                    if(!result) {
                        editUser.email = email
                    } else {
                        return {status: false, err: "Usuário não existe"}
                    }
                }
            }
            if (name) {
                editUser.name = name
            }
            if (role) {
                editUser.role = role
            }

            try {
                await knex.update(editUser).where({id}).table("users")
                return {status: true}
            } catch (err) {
                return {status: false, err: err}
            }

        } else {
            return {status: false, err: "Usuário não existe"}
        }
    }
}

module.exports = new User