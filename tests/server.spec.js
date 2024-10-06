const request = require("supertest");
const server = require("../index");
const app = require('../index')

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeInstanceOf(Object);
    });

    it("Devolver 404 al intentar eliminar un café con un id que no existe", async () => {
        const jwt = "token";
        const idCafeInexistente = 5;

        const response = await request(server)
            .delete(`/cafes/${idCafeInexistente}`)
            .set("Authorization", jwt)
            .send();
                     
        expect(response.status).toBe(404);
    });
});

describe("POST/cafes", () => {
    it("Agregar un nuevo café y devolver un código 201", async () => {
        const nuevoCafe = {
            id: 6,  
            nombre: "Café Expreso"
        };

        const response = await request(app)
            .post("/cafes")
            .send(nuevoCafe); 

        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Array);  
        expect(response.body).toContainEqual(nuevoCafe);
    });
});
    
describe("PUT /cafes", () => {
    it("debe devolver un código 400 si el id en los parámetros es diferente al id en el payload", async () => {
        const idCafe = 1;
        const cafeActualizado = {
            id: 2,
            nombre: "Café Americano"
        };

        const response = await request(app)
            .put(`/cafes/${idCafe}`)
            .send(cafeActualizado);

        expect(response.statusCode).toBe(400);
    });
});
