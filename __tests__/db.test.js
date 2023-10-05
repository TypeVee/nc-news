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
    test("Comments are returned as most recent first", () =>{
        return request(app).get("/api/articles/1/comments")
        .then(({body})=>{
            expect(new Date(body[0].created_at).getTime() > new Date(body[1].created_at).getTime()).toBe(true)
            expect(new Date(body[1].created_at).getTime() > new Date(body[2].created_at).getTime()).toBe(true)
            expect(new Date(body[2].created_at).getTime() > new Date(body[3].created_at).getTime()).toBe(true)
            expect(new Date(body[3].created_at).getTime() > new Date(body[4].created_at).getTime()).toBe(true)
            expect(new Date(body[4].created_at).getTime() > new Date(body[5].created_at).getTime()).toBe(true)
        })
    })
    test("An article with no comments will return a blank array", () =>{
        return request(app).get("/api/articles/4/comments")
        .then((res)=>{
            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual([])
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

describe("POST /api/articles/:article_id/comments", () =>{
    test("Returns a 201 when posting data", ()=>{
        return request(app).post("/api/articles/1/comments").send({username:"lurker", body:"Sorry -snip-"})
            .then((res)=>{
                expect(res.statusCode).toBe(201)
        })
    })
    test("Returns only the comment when successfully posted", ()=>{
        return request(app).post("/api/articles/1/comments").send({username:"lurker", body:"Sorry -snip-"})
            .then((res)=>{
                expect(res.statusCode).toBe(201)
                expect(res.body.postedComment).toBe("Sorry -snip-")
                expect(Object.keys(res.body)).toEqual(["postedComment"])
        })
    })
    test("Returns 403 when given an invalid username", () =>{
        return request(app)
        .post('/api/articles/1/comments').send({username:'kasugaosaka', body: "OH MY GAH"})
        .then((res)=>{
                expect(res.statusCode).toBe(403)
        })
    })
    test("Returns a 404 when posting to an invalid article", () =>{
        return request(app)
        .post('/api/articles/50/comments').send({username:'lurker', body: "Um, how do I post again? edit: nvm"})
        .then((res)=>{
                expect(res.statusCode).toBe(404)
        })
    })
})

describe.only('PATCH /api/articles/:article_id', () =>{
    test('Returns 200 when given a inc_votes object with numerical data', ()=>{
        return request(app)
        .patch('/api/articles/4').send({inc_votes: 1})
        .then((res)=>{
                expect(res.statusCode).toBe(200)
        })
    })
    test('Returns full article with the increased vote', ()=>{
        return request(app)
        .patch('/api/articles/1').send({inc_votes: 50})
        .then((res)=>{
                expect(res.body.votes).toBe(150)
                expect(res.body.article_id).toBe(1)
                expect(res.body.title).toBe('Living in the shadow of a great man')
        })
    })
    test('accepts decreasing the vote', ()=>{
        return request(app)
        .patch('/api/articles/1').send({inc_votes: -50})
        .then((res)=>{
                expect(res.body.votes).toBe(100)
                expect(res.body.article_id).toBe(1)
        })
    })
    test('returns 400 when giving bad content', ()=>{
        return request(app)
        .patch('/api/articles/1').send({inc_votes: "Twenny"})
        .then((res)=>{
                expect(res.statusCode).toBe(400)
        })
    })
    test('Returns 400 when given no content', ()=>{
        return request(app)
        .patch('/api/articles/1').send()
        .then((res)=>{
                expect(res.statusCode).toBe(400)
        })
    })
    test('Returns 404 when given invalid article', ()=>{
        return request(app)
        .patch('/api/articles/999999').send({inc_votes: 1})
        .then((res)=>{
                expect(res.statusCode).toBe(404)
        })
    })
})