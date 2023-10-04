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

describe("GET /api/articles/:article_id/comments", () =>{
    test("Returns 200 status code with an array", () =>{
        return request(app)
        .get("/api/articles/1/comments")
        .then((res)=>{
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body))
        })
    })
    test("Returns an array with appropriate data", ()=>{
        return request(app)
        .get("/api/articles/1/comments")
        .then(({body})=>{
            body.forEach((comment)=>{
                expect(comment).toHaveProperty("comment_id", expect.any(Number))
                expect(comment).toHaveProperty("votes", expect.any(Number))
                expect(comment).toHaveProperty("created_at", expect.any(String))
                expect(comment).toHaveProperty("author", expect.any(String))
                expect(comment).toHaveProperty("body", expect.any(String))
                expect(comment).toHaveProperty("article_id", expect.any(Number))
            })
        })
    })
    test("Non-numeric article ID will return a 400", () =>{
        return request(app)
        .get("/api/articles/fish/comments")
        .then((res)=>{
            expect(res.statusCode).toBe(400)
        })
    })
    test("A non-existent article ID will return a 404", () =>{
        return request(app)
        .get("/api/articles/999999999/comments")
        .then((res)=>{
            expect(res.statusCode).toBe(404)
        })
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
    })
})

