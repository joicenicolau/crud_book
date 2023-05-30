import prisma from '../../../prisma/prisma';

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

export default async function handler(req, res) {
 if (req.method === 'PUT') {
  const { id, name, releaseDate, description, category } = req.body;
  const updatedBook = await updateBook(
    id,
    name,
    releaseDate,
    description,
    category
  );
  res.status(200).json(updatedBook)}}