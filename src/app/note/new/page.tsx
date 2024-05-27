"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Note {
	id: number;
	title: string;
	content: string;
}

const NewNotePage: React.FC = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const router = useRouter();
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const response = await fetch("/api/notes", { method: "GET" });
		const notes = await response.json();
		
		const newNote: Note = {
			id: notes.length ? notes[notes.length - 1].id + 1 : 1,
			title,
			content,
		};
		notes.push(newNote);
		
		await fetch("/api/notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(notes),
		});
		
		router.push("/");
	};
	
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Create New Note</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					placeholder="Type a title for new Note"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded"
				/>
				<textarea
					placeholder="Type a content for new Note"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded"
				/>
				<button
					type="submit"
					className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
				>
					Save
				</button>
			</form>
		</div>
	);
};

export default NewNotePage;
