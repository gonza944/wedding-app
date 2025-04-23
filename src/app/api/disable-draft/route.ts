import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET() {
	// Disable Draft Mode
	const draft = await draftMode()
	draft.disable()
	
	return NextResponse.json({ disabled: true, now: Date.now() })
} 