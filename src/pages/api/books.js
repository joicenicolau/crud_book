import prisma from '../../../prisma/prisma';
// import prisma from '../../../lib/prisma'

async function createBook(name, releaseDate, description, category) {
  const newBook = await prisma.book.create({
    data: {
      name,
      releaseDate,
      description,
      category,
    },
  });
  return newBook;
}

async function deleteBook(id) {
  const deletedBook = await prisma.book.delete({
    where: { id },
  });
  return deletedBook;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, releaseDate, description, category } = req.body;
    const newBook = await createBook(name, releaseDate, description, category);
    res.status(201).json(newBook);
  } else if (req.method === 'GET') {
    // Listar todos os livros
    const books = await prisma.book.findMany({
      include: {
        authors: true,
      },
    });
    res.status(200).json(books);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    const deletedBook = await deleteBook(id);
    res.status(200).json(deletedBook);
  } else {
    res.status(405).end();
  }
}

