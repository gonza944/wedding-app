import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const secret = searchParams.get('secret')
	const slug = searchParams.get('slug')

	// Check the secret and next parameters
	if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
		return NextResponse.json(
			{ message: 'Invalid token or missing slug' },
			{ status: 401 }
		)
	}

	// Enable Draft Mode
	const draft = await draftMode()
	draft.enable()

	// Redirect to the path from the fetched post
	// We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
	return redirect(`/${slug}?__vercel_draft=1`)
} 