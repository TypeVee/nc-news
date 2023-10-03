const app = require("../app");
const request = require('supertest');
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")

beforeAll(() => seed(testData));
afterAll(()=> db.end())

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
    test("Returns 400 status code when requesting an incorrect article ID", () =>{
        return request(app)
        .get('/api/articles/1789079')
        .then((res)=>{
            expect(res.statusCode).toBe(400)
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