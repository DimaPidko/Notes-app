"use server"
import { promises as fs } from 'fs'
import path from 'path'
import type { Note } from '@/provider/store'

const jsonDirectory = path.join(process.cwd(), 'db.json');

export const getNoteById = async (id: number): Promise<Note | undefined> => {
	try {
		const fileContents = await fs.readFile(jsonDirectory, 'utf8');
		const notes: Note[] = JSON.parse(fileContents);
		
		return notes.find(note => note.id === id);
	} catch (error) {
		console.error(error);
		return undefined;
	}
};
