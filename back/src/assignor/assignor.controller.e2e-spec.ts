import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';

describe('AssignorController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    });

    accessToken = jwt.sign({ sub: user.id });

    await app.init();
  });

  it('should be able to create a new assignor', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignor')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        document: '123456789',
        phone: '65999999999',
      });

    expect(response.status).toBe(HttpStatus.CREATED);

    const assignorInDatabase = await prisma.assignor.findFirst({
      where: {
        email: 'johndoe@example.com',
      },
    });

    expect(assignorInDatabase).toBeTruthy();
  });

  it('should be able to get all assignors', async () => {
    const response = await request(app.getHttpServer())
      .get('/assignor')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual([
      expect.objectContaining({ name: 'John Doe' }),
    ]);
  });

  it('should be able to get an assignor by id', async () => {
    const assignor = await prisma.assignor.create({
      data: {
        name: 'Teste teste',
        email: 'teste@teste.com',
        document: '123456789',
        phone: '65999999999',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/assignor/${assignor.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({ name: 'Teste teste' }),
    );
  });

  it('should be able to update an assignor', async () => {
    const assignor = await prisma.assignor.create({
      data: {
        name: 'Teste teste',
        email: 'teste2@teste.com',
        document: '123456789',
        phone: '65999999999',
      },
    });

    const response = await request(app.getHttpServer())
      .put(`/assignor/${assignor.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Teste teste 2',
      });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({ name: 'Teste teste 2' }),
    );
  });

  it('should be able to delete an assignor', async () => {
    const assignor = await prisma.assignor.create({
      data: {
        name: 'Teste teste',
        email: 'teste3@teste.com',
        document: '123456789',
        phone: '65999999999',
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/assignor/${assignor.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('should not be able to create a new assignor with send a invalid params', async () => {
    const response = await request(app.getHttpServer())
      .post('/assignor')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        email: 'teste4@teste.com',
      });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should not be able to get an assignor by id with invalid id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/assignor/invalid-id`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
