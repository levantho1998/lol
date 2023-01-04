const userProfileModel = require('./module')
const { signToken, verifyToken } = require('./jwt')


const handlers = {

    async findMany(req, res, next) {
        try {
            let {
                name,
                sortBy,
                sort
            } = req.query
            let conditions = {}
            if (name) {
                conditions.name = new RegExp(name, 'i')
            }
            // let sortInfo = `${sort === 'Highest to Lowest' ? '-' : ''}${sortBy}`

            let customers = await userProfileModel.find(conditions)
            res.json(customers)
        } catch (err) {
            next(err)
        }
    },
    async signIn(req, res, next) {
        try {
            // 1.get data {email,password}
            // 2. find user by email 
            // 3.validate password
            // 4.gen access token (next session)
            // 5.return user info
            let { email, password } = req.body
            if (!email) {
                throw new Error(`Missing 'email'`)
            }
            if (!password) {
                throw new Error(`Missing 'password'`)
            }
            let user = await userProfileModel.findOne({
                email: String(email).toLowerCase().trim()
            })

            let hashPassword = hasdMd5(String(password))
            if (!user) {
                throw new Error(`Email is not found!`)
            }
            if (hashPassword != user.password) {
                throw new Error(`Wrong password!`)
            }
            // sign in success here if no error throw
            let userPayload = user.toObject()
            // gen access token
            delete userPayload.password
            userPayload.accessToken = signToken(userPayload)

            res.json(userPayload)
        } catch (err) {
            next(err)
        }
    },
    async signUp(req, res, next) {
        let user = req.body
        let password = user.password
        user.password = hasdMd5(password)
        let item = await userProfileModel.create(user)
        res.json(item)
    },
    validateAccessToken(req, res, next) {
        try {
            // console.log(req.headers)
            let token = req.headers.authorization
            if (!token) {
                throw new Error('Missing token!')
            }
            let payload = verifyToken(token)
            req.user = payload
            console.log(payload)
            next()
        } catch (err) {
            next(err)
        }
    },
    async update(req, res, next) {
        try {
            let data = req.body

            let conditions = {}
            if (data.email) {
                conditions.email = data.email
            }
            console.log(data)
            console.log(conditions)
            let item = await userProfileModel.findOneAndUpdate(conditions, data, { new: true })
            res.json(item)
        } catch (err) {
            next(err)
        }
    }

}

function hasdMd5(string) {
    return require('crypto').createHash('md5').update(string).digest('hex')
}

module.exports = handlers

  // create admin user
    // async signIn(req, res, next) {
    //     let user = {
    //         email: 'doanhtuan7198@gmail.com',
    //         password: hashPassword,
    //         fullname: 'Do Anh Tuan',
    //         roles: ['admin']
    //     }
    //     let item = await userProfileModel.create(user)
    //     res.json(item)
    // }