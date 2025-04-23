import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const secret = searchParams.get('secret')
	const slug = searchParams.get('slug')
	const enableDraft = searchParams.get('draft') === 'true'
	const isProd = process.env.NODE_ENV === 'production'

	// Check the secret and next parameters
	if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
		return NextResponse.json(
			{ message: 'Invalid token or missing slug' },
			{ status: 401 }
		)
	}

	const draft = await draftMode()

	// In production, always disable draft mode
	// In non-production, enable draft mode only if explicitly requested
	if (isProd || !enableDraft) {
		draft.disable()
	} else {
		draft.enable()
	}

	// Redirect to the path from the fetched post
	// We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
	return redirect(`/${slug}`)
} 