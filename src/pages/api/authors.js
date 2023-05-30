import prisma from '../../../prisma/prisma';

async function createAuthor(name, birthDate, biography) {
  const newAuthor = await prisma.author.create({
    data: {
      name,
      birthDate,
      biography,
    },
  });
  return newAuthor;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, birthDate, biography } = req.body;
    const newAuthor = await createAuthor(name, birthDate, biography);
    res.status(201).json(newAuthor);
  } else if (req.method === 'GET') {
    // Listar autores
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
  } else {
    res.status(405).end();
  }
}
