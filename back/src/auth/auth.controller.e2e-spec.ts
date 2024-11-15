import { HttpStatus, INestApplication } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import request from "supertest";

describe('AuthController (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService)

        await app.init()
    })

    it('should be able to register a new user', async () => {
        const response = await request(app.getHttpServer()).post('/auth/register').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(response.status).toBe(HttpStatus.CREATED)

        const userOnDatabase = await prisma.user.findUnique({
            where: {
                email: 'johndoe@example.com',
            },
        })

        expect(userOnDatabase).toBeTruthy()
    })

    it('should be able to authenticate a user', async () => {
        const responseAuth = await request(app.getHttpServer()).post('/auth/login').send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(responseAuth.status).toBe(HttpStatus.OK)

        expect(responseAuth.body).toHaveProperty('access_token')
    })

    it('should not be able to authenticate a user with wrong password', async () => {
        const responseAuth = await request(app.getHttpServer()).post('/auth/login').send({
            email: 'johndoe@example.com',
            password: 'wrong-password'
        })

        expect(responseAuth.status).toBe(HttpStatus.UNAUTHORIZED)
    })

    it('should not be able to register a user with the same email', async () => {
        const response = await request(app.getHttpServer()).post('/auth/register').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
        })

        expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    })
})