import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
	const jsonDirectory = path.join(process.cwd());
	const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');
	const notes = JSON.parse(fileContents);
	
	return NextResponse.json(notes);
}

export async function POST(request: Request) {
	const newNotes = await request.json();
	const jsonDirectory = path.join(process.cwd());
	await fs.writeFile(jsonDirectory + '/db.json', JSON.stringify(newNotes, null, 2));
	
	return NextResponse.json(newNotes);
}
