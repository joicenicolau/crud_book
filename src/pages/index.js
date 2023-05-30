import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

async function listAuthors() {
  const response = await fetch('/api/authors');
  if (!response.ok) {
    throw new Error('Error fetching authors');
  }
  const authors = await response.json();
  return authors;
}

async function createBook(bookData) {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) {
    throw new Error('Error creating book');
  }
  const book = await response.json();
  return book;
}

// async function listBooks() {
//   const response = await fetch('/api/books');
//   if (!response.ok) {
//     throw new Error('Error fetching books');
//   }
//   const books = await response.json();
//   return books;
// }

async function filterBooksByAuthor(authorName) {
  const response = await fetch(`/api/books?author=${encodeURIComponent(authorName)}`);
  if (!response.ok) {
    throw new Error('Error filtering books by author');
  }
  const books = await response.json();
  return books;
}

export default function Home() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [biography, setBiography] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = await createBook({ name, releaseDate, description, category });
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setName('');
      setReleaseDate('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleAuthorFilterChange = (e) => {
    setAuthorFilter(e.target.value);
  };
  
  const handleListBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Error fetching books');
      }
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterBooksByAuthor = async () => {
    try {
      const filteredBooks = await filterBooksByAuthor(authorFilter);
      setBooks(filteredBooks);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    if (authorFilter === '') {
      handleListBooks();
    } else {
      handleFilterBooksByAuthor();
    }
  }, [authorFilter]);

  const router = useRouter();

  const handleEditBook = async (book) => {
    setSelectedBookId(book.id);
    router.push(`/edit/${book.id}`);
  };

  const handleDeleteBook = async (book) => {
    // Implemente a lógica para excluir o livro
    // Exemplo:
    const response = await fetch(`/api/books/${book.id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      handleListBooks();
    } else {
      console.error('Error deleting book');
    }
  };
  

  const handleListAuthors = async () => {
    try {
      const authors = await listAuthors();
      setAuthors(authors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearList = () => {
    setAuthors([]);
    setBooks([]);
  };

  return (
    <div>
      <h1>Create Author</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <textarea
          placeholder="Biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <hr />

      <h1>Authors</h1>
      <button onClick={handleListAuthors}>List Created Authors</button>
      <button onClick={handleClearList}>Clear List</button>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.name} - {author.birthDate} - {author.biography}
          </li>
        ))}
      </ul>

      <h1>Books</h1>
      <button onClick={handleListBooks}>List Books</button>
      <button onClick={handleClearList}>Clear List</button>
      <input
        type="text"
        placeholder="Author Filter"
        value={authorFilter}
        onChange={handleAuthorFilterChange}
      />
      <ul>
      {books.map((book) => (
        <li key={book.id}>
      {book.name} - {book.releaseDate} - {book.description}
          <button onClick={() => handleEditBook(book)}>Edit</button>
          <button onClick={() => handleDeleteBook(book)}>Delete</button>
        </li>
      ))}
      </ul>
    </div>
  );
}
