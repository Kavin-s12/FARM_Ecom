import bcrypt from 'bcryptjs'

const user = [
    {
        name: 'ADMIN',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'kavin',
        email: 'kavin@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'raj',
        email: 'raj@example.com',
        password: bcrypt.hashSync('123456',10),
    }
]

export default user