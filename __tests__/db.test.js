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

describe("GET /api/articles", () =>{
    test("Returns 200 status and an array", () =>{
        return request(app)
        .get('/api/articles')
        .then((res)=>{
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body.articles)).toBe(true)
        })
    })
    test("All objects in the articles array contain basic article data, without body", () =>{
        return request(app)
        .get('/api/articles')
        .then(({body})=>{
            expect(body.articles.length > 0).toBe(true)
            body.articles.forEach((article)=>{
                expect(article).toHaveProperty("article_id")
                expect(article).toHaveProperty("author")
                expect(article).toHaveProperty("title")
                expect(article).toHaveProperty("topic")
                expect(article).toHaveProperty("created_at")
                expect(article).toHaveProperty("votes")
                expect(article).toHaveProperty("article_img_url")
                expect(article).not.toHaveProperty('body')
            })
        })
    })
    test("Articles contain comment_count, a numeric count of comments referencing that ID within the comments table", () =>{
        return request(app)
        .get('/api/articles')
        .then(({body})=>{
            expect(body.articles.length > 0).toBe(true)
            body.articles.forEach((article)=>{
                expect(article).toHaveProperty("comment_count", expect.any(Number))
            })
        })
    })
    test("Articles return sorted by their date in decending order", () =>{
        return request(app)
        .get('/api/articles')   
        .then(({body})=>{
            expect(new Date(body.articles[0].created_at).getTime() < new Date(body.articles[1].created_at).getTime()).toBe(true)
            expect(new Date(body.articles[1].created_at).getTime() < new Date(body.articles[2].created_at).getTime()).toBe(true)
            expect(new Date(body.articles[2].created_at).getTime() < new Date(body.articles[3].created_at).getTime()).toBe(true)
            expect(new Date(body.articles[3].created_at).getTime() < new Date(body.articles[4].created_at).getTime()).toBe(true)
            expect(new Date(body.articles[4].created_at).getTime() < new Date(body.articles[6].created_at).getTime()).toBe(true)
        })
    })
    test("Bad Queries do not effect outcome length or status", () =>{
        return request(app)
        .get('/api/articles?article_id=ga')
        .then((res)=>{
                expect(res.statusCode).toBe(200)
                expect(res.body.articles.length > 0)
        })
    })

})