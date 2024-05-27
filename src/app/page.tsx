"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Note } from '@/provider/store'

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    try {
      fetch("/api/notes", { method: "GET" })
        .then((response) => response.json())
        .then((data) => setNotes(data))
        .finally(() => setLoading(false))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error)
    }
  }, []);
  
  const onEditNote = () => {
  
  }
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <ul className="list-disc pl-5 mb-4">
        {loading ? <h1>Loading...</h1>
          :
          notes.map((note) => (
          <li key={note.id} className='mb-2 flex'>
            <Link className='text-blue-500 hover:underline' href={`/note/${note.id}`}>
              {note.title}
            </Link>
            <Link href={`/note/edit/${note.id}`}>
              <button className='flex bg-blue-500 px-4 hover:bg-blue-700 font-bold rounded ml-10 '>Edit Note</button>
            </Link>
          
          </li>
        ))}
      </ul>
      <Link className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" href="/note/new">
        Add New Note
      </Link>
    </main>
  );
};

export default Home;
