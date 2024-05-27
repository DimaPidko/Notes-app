"use server"
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
	try {
		const jsonDirectory = path.join(process.cwd());
		const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');
		const notes = JSON.parse(fileContents);
		
		return NextResponse.json(notes);
	} catch (error) {
		console.error(error)
	}
}

export async function POST(request: Request) {
	try {
		const newNotes = await request.json();
		const jsonDirectory = path.join(process.cwd());
		await fs.writeFile(jsonDirectory + '/db.json', JSON.stringify(newNotes, null, 2));
		
		return NextResponse.json(newNotes);
	} catch (error) {
		console.error(error)
	}
}

export async function PUT(request: Request) {
	try {
		const updatedNote = await request.json()
		console.log(updatedNote)
	} catch (error) {
		console.error(error)
	}
}