const app = require("../app");
const request = require('supertest');
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")

beforeAll(() => seed(testData));
afterAll(()=> db.end())

describe("EndPoints", () =>{
    test("Nonsense requests return a 404", () =>{
        return request(app)
        .get('/api/blueberry')
        .expect(404)
    })
})

describe("GET /api/topics", () =>{
    test("GET request to topics returns a 200", () =>{
        return request(app)
        .get('/api/topics')
        .expect(200)
    })
    test("Returns data with 'slug' and 'description' tables", () =>{
        return request(app)
        .get('/api/topics')
        .then(({body})=>{
            expect(Object.keys(body).length > 0).toBe(true)
            body.forEach((topic)=>{
                expect(topic).toHaveProperty("slug", expect.any(String))
                expect(topic).toHaveProperty("description", expect.any(String))
            })
        })
        .catch((err)=>{throw err})
    })
})

describe("GET /api", () =>{
    test("GET /api returns a 200 & returns an object", () =>{
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body})=>{
            expect(typeof body).toBe("object")
        })
        .catch((err)=>{throw err})
    })
    test("Endpoints will have the properties of 'description, queries and example response'", () =>{
        return request(app)
        .get('/api')
        .then(({body})=>{
            Object.keys(body).forEach((endPoint)=>{
                expect(body[endPoint]).toHaveProperty("description")
                expect(body[endPoint]).toHaveProperty("queries")
                expect(body[endPoint]).toHaveProperty("exampleResponse")

            })
        })
        .catch((err)=>{throw err})
    })
})