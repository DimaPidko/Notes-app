"use server"
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function PUT(request: Request) {
	try {
		const updatedNote = await request.json();
		const jsonDirectory = path.join(process.cwd());
		const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');
		const notes = JSON.parse(fileContents);
		
		const noteIndex = notes.findIndex((note: { id: number }) => note.id === updatedNote.id);
		if (noteIndex !== -1) {
			notes[noteIndex] = updatedNote;
			await fs.writeFile(jsonDirectory + '/db.json', JSON.stringify(notes, null, 2));
			return NextResponse.json(updatedNote);
		} else {
			return NextResponse.json({ message: 'Note not found' }, { status: 404 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to update note' }, { status: 500 });
	}
}
