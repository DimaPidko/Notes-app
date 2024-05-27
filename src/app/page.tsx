"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Note {
  id: number;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  
  useEffect(() => {
    fetch("/api/notes", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <ul className="list-disc pl-5 mb-4">
        {notes.map((note) => (
          <li key={note.id} className="mb-2">
            <Link className="text-blue-500 hover:underline" href={`/note/${note.id}`}>
              {note.title}
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
