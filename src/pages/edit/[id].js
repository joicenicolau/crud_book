import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
  
  export default function EditBook() {
    const router = useRouter();
    const { id } = router.query;
    // const { id } = useRouter().query;

    const [book, setBook] = useState({
      id,
      name: '',
      releaseDate: '',
      category: '',
      description: '',
    });
  
    // useEffect(() => {
    //   fetchBook();
    // }, []);
  
    // const fetchBook = async () => {
    //   try {
    //     const response = await fetch(`/api/${id}`);
    //     if (response.ok) {
    //       const bookData = await response.json();
    //       setBook(bookData);
    //     } else {
    //       console.error('Error fetching book:', response.status);
    //     }
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // };

    const handleUpdateBook = async (e) => {
      try {
        console.log('book ==>', book)
        // e.preventDefault();
        const response = await fetch(`/api/${book.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: book.name,
            releaseDate: book.releaseDate,
            description: book.description,
            category: book.category,
          }),
        });
        if (response.ok) {
          // Atualização bem-sucedida, faça qualquer ação necessária
          console.log('Book updated successfully');
        } else {
          console.error('Error updating book:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const updateBooks = await handleUpdateBook({ id, name, releaseDate, description, category });
    //     setBook(() => updateBooks);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

  return (
    <div>
    <form method='PUT'>
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
