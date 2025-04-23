import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json()
		const secret = request.headers.get('x-contentful-webhook-secret')

		// Validate the request has the correct secret
		if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
			return NextResponse.json(
				{ message: 'Invalid revalidation secret' },
				{ status: 401 }
			)
		}

		// Extract the content type and id from the Contentful webhook payload
		const { sys } = requestBody
		const contentType = sys?.contentType?.sys?.id || 'unknown'
		const entryId = sys?.id || 'unknown'

		// Revalidate the specific content type tag
		revalidateTag(`contentful-${contentType}`)
		
		// Revalidate the specific entry tag
		revalidateTag(`contentful-entry-${entryId}`)
		
		console.log(`Revalidated contentful-${contentType} and contentful-entry-${entryId}`)
		
		return NextResponse.json({ 
			revalidated: true, 
			now: Date.now(),
			contentType,
			entryId
		})
	} catch (error) {
		console.error('Revalidation error:', error)
		return NextResponse.json(
			{ message: 'Error revalidating', error },
			{ status: 500 }
		)
	}
} 