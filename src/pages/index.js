import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';

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

async function createAuthor(authorData) {
  const response = await fetch('/api/authors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authorData),
  });
  if (!response.ok) {
    throw new Error('Error creating author');
  }
  const author = await response.json();
  return author;
}

export default function Home() {
  const [nameAuthor, setNameAuthor] = useState('');
  const [nameBook, setNameBook] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [biography, setBiography] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [filterAuthorId, setFilterAuthorId] = useState(null);
  const [author, setAuthor] = useState(null);


  const handleSubmitAuthor = async (e) => {
    e.preventDefault();
    try {
      const newAuthor= await createAuthor({ name: nameAuthor, birthDate, biography });
      setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
      setNameAuthor('');
      setBirthDate('');
      setBiography('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitBooks = async (e) => {
    e.preventDefault();
    // console.log('s', selectedAuthorId)
    try {
      const newBook = await createBook({ name: nameBook, releaseDate, description, category, author: author });
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setNameBook('');
      setReleaseDate('');
      setDescription('');
      setCategory('');
      setAuthor(null);
      // console.log('newBook ==>', newBook);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleListBooks = async () => {
    try {
      let url = '/api/books';
      if (filterAuthorId) {
        url += `?authorId=${filterAuthorId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching books');
      }
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error(error);
    }
  };
    
  useEffect(() => {
    handleListBooks();
  }, [filterAuthorId]);
  
  const router = useRouter();

  const handleEditBook = async (book) => {
    setSelectedBookId(book.id);
    router.push(`/edit/${book.id}`);
  };

  const handleDeleteBook = async (book) => {
    try {
    const response = await fetch(`api/books?id=${book.id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      router.push('/'); // Redireciona para a página de listagem de livros após a exclusão
      router.reload()
    } else {
      throw new Error('Error deleting book');
    }
  } catch (error) {
    console.error(error)
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

  const handleSelectAuthor = (authorId) => {
    setSelectedAuthorId(authorId);
    setSelectedAuthor(authors.filter((author) => author.id === authorId)?.name || '');
  };
  
  const handleClearFilter = () => {
    setSelectedAuthorId(null);
    setSelectedAuthor('');
    setFilterAuthorId(null);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-8">Create Author</h1>
      <form onSubmit={handleSubmitAuthor} className="mt-4">
      <input
          type="text"
          placeholder="Name"
          value={nameAuthor}
          onChange={(e) => setNameAuthor(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <textarea
          placeholder="Biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button type="submit"
        className="border border-gray-500 rounded px-4 py-2"
        >Create</button>
      </form>
      <hr />

      <h1 className="text-3xl font-bold mt-8">Authors</h1>
      <button onClick={handleListAuthors} className="border border-gray-500 rounded px-4 py-2">List Authors</button>
      <button onClick={handleClearList} className="border border-gray-500 rounded px-4 py-2">Clear List</button>
      <ol>
        {authors.map((author) => (
          <li key={author.id}>
            {author.name} - {author.birthDate} - {author.biography}
          </li>
        ))}
      </ol>

      <h1 className="text-3xl font-bold mt-8">Create Books</h1>
      <form onSubmit={handleSubmitBooks}>
        <input
          type="text"
          placeholder="Name"
          value={nameBook}
          onChange={(e) => setNameBook(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Release Date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
         <input
          type="number"
          placeholder="Id"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button type="submit" className="border border-gray-500 rounded px-4 py-2">Create</button>
      </form>
      <hr />

      <h1 className="text-3xl font-bold mt-8">Books</h1>
      <button onClick={handleListBooks} className="border border-gray-500 rounded px-4 py-2">List Books</button>
      <button onClick={handleClearList} className="border border-gray-500 rounded px-4 py-2">Clear List</button>

      <select
        value={selectedAuthorId || ''}
        onChange={(e) => handleSelectAuthor(+e.target.value)}
        className="border border-gray-300 rounded px-4 py-2"
      >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
      </select>

{/* <button onClick={handleFilterBooksByAuthor} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Filter
</button> */}
      <button onClick={handleClearFilter} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Clear Filter
      </button>

      <ul>
        {books
        .filter((book) => ( 
          !selectedAuthorId ? book : book.authors[0]?.authorId === selectedAuthorId
        ))
        .map((book) => (
          <li key={book.id}>
        {book.name} - {book.category} - {book.description}
            <button onClick={() => handleEditBook(book)} className="border border-gray-500 rounded px-4 py-2">Edit</button>
            <button onClick={() => handleDeleteBook(book)} className="border border-gray-500 rounded px-4 py-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
