import { Metadata } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

interface Note {
	id: number;
	title: string;
	content: string;
}

interface NotePageProps {
	params: {
		id: string;
	};
}

export const metadata: Metadata = {
	title: 'Note',
};

const getNoteById = async (id: number) => {
	const jsonDirectory = path.join(process.cwd());
	const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');
	const notes: Note[] = JSON.parse(fileContents);
	return notes.find(note => note.id === id);
};

export default async function NotePage({ params }: NotePageProps) {
	const note = await getNoteById(Number(params.id));
	
	if (!note) {
		return <div>Note not found</div>;
	}
	
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">{note.title}</h1>
			<p>{note.content}</p>
		</div>
	);
}
