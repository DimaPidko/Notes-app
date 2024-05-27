import { Metadata } from 'next';
import { getNoteById } from '@/hooks/useNote'

interface NotePageProps {
	params: {
		id: string;
	};
}

// export const metadata: Metadata = {
// 	title: 'Note',
// };


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
