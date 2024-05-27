"use client"
import type { Note } from '@/provider/store'
import React, { useState, useEffect } from 'react'
import { getNoteById } from '@/hooks/useNote'
import { useRouter } from 'next/navigation'

interface NotePageProps {
	params: {
		id: string;
	}
}

const EditPage: React.FC<NotePageProps> = ({ params }) => {
	const router = useRouter()
	
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	
	useEffect(() => {
		const fetchNote = async () => {
			try {
				const note = await getNoteById(Number(params.id))
				if (note) {
					setTitle(note.title)
					setContent(note.content)
				} else {
					setError('Note not found')
				}
			} catch (err) {
				setError('Failed to fetch the note')
			} finally {
				setLoading(false)
			}
		}
		fetchNote()
	}, [params.id])
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		try {
			const updateNote: Note = {
				id: Number(params.id),
				title,
				content
			}
			const response = await fetch(`/api/notes/${Number(params.id)}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updateNote)
			})
			
			if (!response.ok) {
				const errorText = await response.text()
				throw new Error(`Failed to update note: ${response.status} ${response.statusText} - ${errorText}`)
			}
			
			router.push("/")
		} catch (error) {
			console.error(error)
			setError("Failed to update the note")
		}
	}
	
	if (loading) return <h1>Loading...</h1>
	if (error) return <h1>{error}</h1>
	
	return (
		<div>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					className="w-full p-2 border border-gray-300 rounded text-zinc-950"
				/>
				<textarea
					onChange={(e) => setContent(e.target.value)}
					value={content}
					className="w-full p-2 border border-gray-300 rounded"
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded text"
				>
					Save
				</button>
			</form>
		</div>
	)
}

export default EditPage
