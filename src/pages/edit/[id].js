import { useRouter } from 'next/router';
import { useState } from 'react';
  
export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;


  const [book, setBook] = useState({
    id,
    name: '',
    releaseDate: '',
    category: '',
    description: '',
  });
  
   const handleUpdateBook = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`/api/books`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: +book.id,
          name: book.name,
          releaseDate: book.releaseDate,
          description: book.description,
          category: book.category,
        }),
      });
      if (response.ok) {
        console.log('Book updated successfully');
      } else {
        console.error('Error updating book:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form>
      <h1>Edit Book</h1>
      <p>name</p>
      <input
        type="text"
        value={book.name}
        onChange={(e) => setBook({ ...book, name: e.target.value })}
      />
      <p>releaseDate</p>
      <input
        type="text"
        value={book.releaseDate}
        onChange={(e) => setBook({ ...book, releaseDate: e.target.value })}
      />
      <p>category</p>
      <input
        type="text"
        value={book.category}
        onChange={(e) => setBook({ ...book, category: e.target.value })}
      />
      <p>description</p>
      <textarea
        value={book.description}
        onChange={(e) => setBook({ ...book, description: e.target.value })}
      ></textarea>
      <button onClick={handleUpdateBook}>Update Book</button>
    </form>
    </div>
  );
}
