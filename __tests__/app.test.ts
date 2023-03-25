import request from "supertest";
import app from "../src/app";

describe("Test app.ts",()=>{
    test("Health check", async()=> {
        const res = await request(app).get("/healthChecker");
        expect(res.body).toEqual({status: "success", message: 'Welcome to Cutshort'});
    });
});