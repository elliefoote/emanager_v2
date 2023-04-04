import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { RepairsService } from './repairs.service';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { CreateRepairDto } from './dto/create-repair.dto';

const repairsArray = [
  [
    {
      id: 'clg168lgg000br9nga8b4cf9u',
      model: 'iPhone X',
      brand: 'Apple',
      serial_number: '0237BAD7JL8',
      repair_status: 'Delivered',
      notes: 'Screen is broken',
      client_id: 'clg168lft0006r9ng5bxeiilw',
      assigned_to: 'clg168lf90002r9nggzji1tu9',
    },
    {
      id: 'clg295y510001r9dxyfpiikql',
      model: 'dfgdfg',
      brand: 'dgfdfg',
      serial_number: '2112334',
      repair_status: 'Not started',
      notes: 'sdfsdf',
      client_id: 'clg168lft0006r9ng5bxeiilw',
      assigned_to: 'clg168ler0000r9nggy9kkhk4',
    },
    {
      id: 'clg28l1mx0003r965ov3advja',
      model: 'Galaxy 1000',
      brand: 'Samsung',
      serial_number: 'abcd1234',
      repair_status: 'In progress',
      notes: 'Cannot send anything',
      client_id: 'clg168lfi0004r9ng2ugu36ei',
      assigned_to: 'clg168ler0000r9nggy9kkhk4',
    },
  ],
];

const oneRepair = repairsArray[0];

const db = {
  repair: {
    findMany: jest.fn().mockResolvedValue(repairsArray),
    findUnique: jest.fn().mockResolvedValue(oneRepair),
    findFirst: jest.fn().mockResolvedValue(oneRepair),
    create: jest.fn().mockResolvedValue(oneRepair),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneRepair),
    delete: jest.fn().mockResolvedValue(oneRepair),
  },
};

describe('RepairsService', () => {
  let service: RepairsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepairsService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<RepairsService>(RepairsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of repair jobs', async () => {
      const repairs = await service.findAll();
      expect(repairs).toEqual(repairsArray);
    });
  });

  describe('getOne', () => {
    it('should get a single repair', () => {
      expect(service.findOne('an email')).resolves.toEqual(oneRepair);
    });
  });

  describe('createOne', () => {
    it('should successfully create a new repair job', () => {
      const fakeDto = new CreateRepairDto();
      Object.assign(fakeDto, oneRepair);
      expect(service.create(fakeDto)).resolves.toEqual(oneRepair);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const fakeDto = new UpdateRepairDto();
      Object.assign(fakeDto, oneRepair);
      const repair = await service.update('a uuid', fakeDto);
      expect(repair).toEqual(oneRepair);
    });
  });

  describe('deleteOne', () => {
    it('should return the deleted item', () => {
      expect(service.remove('a uuid')).resolves.toEqual(oneRepair);
    });
  });
});
