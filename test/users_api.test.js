const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

/*
WRITE TESTS
https://fullstackopen.com/en/part4/token_authentication#exercises-4-15-4-23
https://fullstackopen.com/en/part4/user_administration#mongoose-schema-for-users
*/
describe("when there is initially one user in DB", () => {
    beforeEach(async() => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("secret", 10)
        const user = new User({username: "root", passwordHash})

        await user.save()
    })

    test("creation succeeds with a fresh username", async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "autoTest",
            name: "Auto Tester",
            password: "test"
        }

        await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test("creation fails with proper error message and code if username alredy taken", async()=>{
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: "root",
            name: "AutoSuperTester",
            password: "test1"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
        
        expect(result.body.error).toContain("expected `username` to be unique")

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})