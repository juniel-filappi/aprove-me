import { HttpStatus, INestApplication } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { hash } from "bcryptjs";
import request from "supertest";

describe('PayableController (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService
    let jwt: JwtService
    let accessToken: string
    let assignorId: string

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService)
        jwt = moduleRef.get(JwtService)

        const user = await prisma.user.create({
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: await hash('123456', 8),
            },
        })
        const assignor = await prisma.assignor.create({
            data: {
                name: 'Teste teste',
                email: 'teste@teste.com',
                document: '123456789',
                phone: '65999999999'
            }
        })

        assignorId = assignor.id
        accessToken = jwt.sign({sub: user.id})

        await app.init()
    })

    it('should be able to create a payable', async () => {
        const response = await request(app.getHttpServer())
            .post('/payable')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                assignorId: assignorId,
                value: 1000,
                emissionDate: new Date(),
            })

        expect(response.status).toBe(HttpStatus.CREATED)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                assignorId: assignorId,
                value: 1000,
                emissionDate: expect.any(String),
            })
        )
    })

    it('should be able to get all payables', async () => {
        const response = await request(app.getHttpServer())
            .get('/payable')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(HttpStatus.OK)
        expect(response.body).toEqual([
            expect.objectContaining({
                id: expect.any(String),
                assignorId: expect.any(String),
                value: expect.any(Number),
                emissionDate: expect.any(String),
            })
        ])
    })

    it('should be able to get a payable by id', async () => {
        const payable = await prisma.payable.create({
            data: {
                value: 1000,
                emissionDate: new Date(),
                assignorId: assignorId,
            }
        })

        const response = await request(app.getHttpServer())
            .get(`/payable/${payable.id}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(HttpStatus.OK)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: payable.id,
                assignorId: assignorId,
                value: expect.any(Number),
                emissionDate: expect.any(String),
            })
        )
    })

    it('should be able to update a payable', async () => {
        const payable = await prisma.payable.create({
            data: {
                value: 1000,
                emissionDate: new Date(),
                assignorId: assignorId,
            }
        })

        const response = await request(app.getHttpServer())
            .put(`/payable/${payable.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                value: 2000,
            })

        expect(response.status).toBe(HttpStatus.OK)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: payable.id,
                assignorId: assignorId,
                value: 2000,
                emissionDate: expect.any(String),
            })
        )
    })

    it('should be able to delete a payable', async () => {
        const payable = await prisma.payable.create({
            data: {
                value: 1000,
                emissionDate: new Date(),
                assignorId: assignorId,
            }
        })

        const response = await request(app.getHttpServer())
            .delete(`/payable/${payable.id}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(HttpStatus.NO_CONTENT)
    })

    it('should be able to create a payable with a batch', async () => {
        const payables = []
        for (let i = 0; i < 10; i++) {
            payables.push({
                assignorId: assignorId,
                value: Math.floor(Math.random() * 1000),
                emissionDate: new Date(),
            })
        }

        const response = await request(app.getHttpServer())
            .post('/payable/batch')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ payables })

        expect(response.status).toBe(HttpStatus.CREATED)
    })

    it('should not be able to create a payable with invalid params', async () => {
        const response = await request(app.getHttpServer())
            .post('/payable')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                assignorId: 'invalid-assignor-id',
                value: 'invalid-value',
                emissionDate: 'invalid-emission-date',
            })

        expect(response.status).toBe(HttpStatus.BAD_REQUEST)
        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: HttpStatus.BAD_REQUEST,
                message: expect.any(Array),
                error: 'Bad Request',
            })
        )
    })

    it('should not be able to get a payable by invalid id', async () => {
        const response = await request(app.getHttpServer())
            .get('/payable/invalid-id')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(HttpStatus.NOT_FOUND)
        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: HttpStatus.NOT_FOUND,
                message: expect.any(String),
                error: 'Not Found',
            })
        )
    })
})