import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'nestjs-prisma';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const repairShape = expect.objectContaining({
    id: expect.any(String),
    model: expect.any(String),
    brand: expect.any(String),
    serial_number: expect.any(String),
    repair_status: expect.any(String),
    notes: expect.any(String),
    client_id: expect.any(String),
    assigned_to: expect.any(String),
  });
  let user1;
  let jwtToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();

    user1 = await prisma.user.create({
      data: {
        email: 'testUser@gmail.com',
        password:
          '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42,
      },
    });

    const anotherUser = await prisma.user.create({
      data: {
        email: Math.random().toString(36).slice(2, 7) + '@gmail.com',
        password: 'abc123',
      },
    });

    const alice = await prisma.client.create({
      data: {
        email: Math.random().toString(36).slice(2, 7) + '@gmail.com',
        first_name: 'Alice',
        last_name: 'Jones',
        phone_number: '646357780',
      },
    });
    const repair1 = await prisma.repair.create({
      data: {
        model: 'Galaxy S22',
        brand: 'Samsung',
        serial_number: Math.random().toString(36).slice(2, 7),
        repair_status: 'In progress',
        notes: 'Cannot send texts',
        client_id: alice.id,
        assigned_to: user1.id,
      },
    });
    const repair2 = await prisma.repair.create({
      data: {
        model: 'Galaxy S22',
        brand: 'Samsung',
        serial_number: Math.random().toString(36).slice(2, 7),
        repair_status: 'In progress',
        notes: 'Cannot send texts',
        client_id: alice.id,
        assigned_to: anotherUser.id,
      },
    });
  });

  afterEach(async () => {
    await prisma.$transaction([
      prisma.repair.deleteMany(),
      prisma.user.deleteMany(),
      prisma.client.deleteMany(),
    ]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('authenticates', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testUser@gmail.com', pass: 'secret42' });
    jwtToken = response.body.token;
    expect(response.status).toBe(201);
  });

  describe('GET /repairs', () => {
    it('returns a list of repairs', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/repairs')
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([repairShape]));
    });
  });

  describe('GET /repairs/user/userid', () => {
    it('fetches repairs by userid', async () => {
      const url = `/repairs/user/${user1.id}`;
      const { status, body } = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([repairShape]));
      expect(body).toHaveLength(1);
    });
  });
});
