const User = require("../models/User")

class UserController {

    async index(req, res) {
        const users = await User.findAll()

        res.json(users)
    }

    async findUser(req, res) {
        const id = req.params
        const user = await User.findById(id)
        console.log(user)

        if(user.length < 1) {
            res.status(404)
            res.send("Usuário não encontrado")
        } else {
            res.json(user)
        }
    }

    async create(req, res) {
        const { name, email, password } = req.body

        if (email == undefined) {
            res.status(400)
            res.json({ error: "Digite um email!"})
            return
        }
        const emailExists = await User.findEmail(email)

        if(emailExists) {
            res.status(400)
            res.json({ error: "Email já cadastrado"})
            return
        } else {
            await User.createUser(name, email, password)
            res.status(200)
            res.send("Tudo certo")
            return
        }

    }

    async edit(req, res) {
        const { name, email, role } = req.body
        const { id } = req.params

        const result = await User.update(id, name, email, role)
        
        if(result) {
            if(result.status) {
                res.send("Tudo ok")
            } else {
                res.status(406)
                res.send(result.err)
            }
        } else {
            res.status(406)
            res.send("Ocorreu um erro no servidor")
        }
    }
}

module.exports = new UserController