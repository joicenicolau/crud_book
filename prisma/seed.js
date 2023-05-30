const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function book() {
  await prisma.book.create({
    data: {
        name: 'Alices Adventures in Wonderland',
        releaseDate: new Date("1865-11-16 09:00:00"),
        description: 'It details the story of a young girl named Alice who falls through a rabbit hole into a fantasy world of anthropomorphic creatures',
        category: 'childrens novel',
      },
  });
}

async function author() {
  await prisma.author.create({
    data: {
        name: 'Lewis Carroll',
        birthDate: new Date("1947-07-21 09:00:00"),
        biography: 'Lewis Carroll, pseudonym of Charles Lutwidge Dodgson, (born January 27, 1832, Daresbury, Cheshire, England—died January 14, 1898, Guildford, Surrey).',
      },
  });
};

async function authorToBook() {
  await prisma.authorToBook.create({
    data: { authorId: 1, bookId: 1 },
  });
};


book()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

author()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

authorToBook()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
