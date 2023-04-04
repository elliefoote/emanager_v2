import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.repair.deleteMany();
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: 'admin@emanager.io',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@emanager.io',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });
  console.log('Test users successfully seeded!');
  const alice = await prisma.client.create({
    data: {
      email: 'alice@gmail.com',
      first_name: 'Alice',
      last_name: 'Jones',
      phone_number: '646357780',
    },
  });
  const bob = await prisma.client.create({
    data: {
      email: 'bob@gmail.com',
      first_name: 'Bob',
      last_name: 'Smith',
      phone_number: '127893478',
    },
  });
  console.log('Test clients successfully seeded!');
  await prisma.repair.create({
    data: {
      model: 'Galaxy S22',
      brand: 'Samsung',
      serial_number: '078583920HA',
      repair_status: 'In progress',
      notes: 'Cannot send texts',
      client_id: alice.id,
      assigned_to: admin.id,
    },
  });
  await prisma.repair.create({
    data: {
      model: 'iPhone X',
      brand: 'Apple',
      serial_number: '0237BAD7JL8',
      repair_status: 'Delivered',
      notes: 'Screen is broken',
      client_id: bob.id,
      assigned_to: user1.id,
    },
  });
  console.log('Test repairs successfully seeded!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
