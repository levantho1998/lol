const adminModel = require('./module')
const { signToken, verifyToken } = require('./jwt')


const handlers = {

    async signIn(req, res, next) {
        try {
            // 1.get data {email,password}
            // 2. find user by email 
            // 3.validate password
            // 4.gen access token (next session)
            // 5.return user info
            let { username, password } = req.body
            if (!username) {
                throw new Error(`Missing 'Username'`)
            }
            if (!password) {
                throw new Error(`Missing 'password'`)
            }
            let admin = await adminModel.findOne({
                username: String(username).toLowerCase().trim()
            })

            let hashPassword = hasdMd5(String(password))
            if (!admin) {
                throw new Error(`Username is not found!`)
            }
            if (hashPassword != admin.password) {
                throw new Error(`Wrong password!`)
            }
            // sign in success here if no error throw
            let adminPayload = admin.toObject()
            // gen access token
            delete adminPayload.password
            adminPayload.accessToken = signToken(adminPayload)

            res.json(adminPayload)
        } catch (err) {
            next(err)
        }
    },
    // async signUp(req, res, next) {
    //     let user = req.body
    //     let password = user.password
    //     user.password = hasdMd5(password)
    //     let item = await userProfileModel.create(user)
    //     res.json(item)
    // },
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
    // create admin user
    async signUp(req, res, next) {
        let hashPassword = hasdMd5(String('admin123'))
        let admin = {
            username: 'admin123',
            password: hashPassword,
        }
        let item = await adminModel.create(admin)
        res.json(item)
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