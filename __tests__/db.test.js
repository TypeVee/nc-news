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
          
describe("GET /api/articles", () => {
    test("Calls appropriate function with 200 status code", () =>{
        return request(app)
        .get('/api/articles/1')
        .then((res)=>{
            expect(res.statusCode).toBe(200)
        })
    })
    test("Returns an object in the body", () =>{
        return request(app)
        .get('/api/articles/1')
        .then(({body})=>{
            expect(typeof body).toBe("object")
        })
    })
    test("Returns 400 status code when requesting a non-numeric ID", () =>{
        return request(app)
        .get('/api/articles/fish')
        .then((res)=>{
            expect(res.statusCode).toBe(400)
        })
    })
    test("Returns 404 status code when requesting an article ID with no data", () =>{
        return request(app)
        .get('/api/articles/135477')
        .then((res)=>{
            expect(res.statusCode).toBe(404)
        })
    })
    test("Returns an article with the correct properties", () =>{
        return request(app)
        .get('/api/articles/1')
        .then(({body})=>{
            expect(body.article).toHaveProperty('author')
            expect(body.article).toHaveProperty('title')
            expect(body.article).toHaveProperty('article_id')
            expect(body.article).toHaveProperty('body')
            expect(body.article).toHaveProperty('topic')
            expect(body.article).toHaveProperty('created_at')
            expect(body.article).toHaveProperty('votes')
            expect(body.article).toHaveProperty('article_img_url')
        })
    })
})
