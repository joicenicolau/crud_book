import prisma from '../../../prisma/prisma';

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

async function updateBook(id, name, releaseDate, description, category) {
  console.log('id ==>', id);
  const updatedBook = await prisma.book.update({
    where: { id },
    data: {
      name,
      releaseDate,
      description,
      category,
    },
  });
  return updatedBook;
}

async function deleteBook(id) {
  console.log('delete ==>', id)
  const deletedBook = await prisma.book.delete({
    where: { id: +id },
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
  } else if (req.method === 'PUT') {
    const { id, name, releaseDate, description, category } = req.body;
    const updatedBook = await updateBook(
      id,
      name,
      releaseDate,
      description,
      category
    );
    res.status(200).json(updatedBook);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    console.log('id da 62 ==>', req.query)
    const deletedBook = await deleteBook(id);
    res.status(200).json(deletedBook);
  } else {
    res.status(405).end();
  }
}

