import { Test, TestingModule } from '@nestjs/testing';
import { RepairsController } from './repairs.controller';
import { RepairsService } from './repairs.service';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { CreateRepairDto } from './dto/create-repair.dto';
import { AuthGuard } from 'src/auth/auth.guard';

describe('RepairsController', () => {
  let controller: RepairsController;
  let service: RepairsService;

  beforeEach(async () => {
    const mock_AuthGuard = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairsController],
      providers: [
        {
          provide: RepairsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(['fake1', 'fake2']),
            findOne: jest.fn().mockImplementation((id: string) => {
              Promise.resolve('fake!');
            }),
            create: jest
              .fn()
              .mockImplementation((repair: CreateRepairDto) =>
                Promise.resolve('also fake!'),
              ),
            update: jest
              .fn()
              .mockImplementation((repair: UpdateRepairDto) =>
                Promise.resolve('also fake!'),
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_AuthGuard)
      .compile();

    controller = module.get<RepairsController>(RepairsController);
    service = module.get<RepairsService>(RepairsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRepairs', () => {
    it('should return an array of repair jobs', async () => {
      await expect(controller.findAll()).resolves.toEqual(['fake1', 'fake2']);
    });
  });

  // TODO - expand tests to cover each route
});
