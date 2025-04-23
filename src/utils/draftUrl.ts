/**
 * Generates a URL for the draft mode API route
 * @param slug The content slug to view in draft mode
 * @param enableDraft Optional flag to explicitly enable draft mode in non-production environments
 * @returns A URL string for the draft mode API route
 */
export function getDraftUrl(slug: string, enableDraft = true): string {
	if (!slug) {
		throw new Error('Slug is required for draft mode URL')
	}

	const secret = process.env.CONTENTFUL_PREVIEW_SECRET

	if (!secret) {
		console.warn('CONTENTFUL_PREVIEW_SECRET is not defined')
		return `/${slug}`
	}

	const params = new URLSearchParams({
		secret,
		slug,
	})

	if (enableDraft) {
		params.set('draft', 'true')
	}

	return `/api/draft?${params.toString()}`
}

/**
 * Redirects to the draft mode URL for the given slug
 * Can only be used in client components
 * @param slug The content slug to view in draft mode
 * @param enableDraft Optional flag to explicitly enable draft mode in non-production environments
 */
export function redirectToDraft(slug: string, enableDraft = true): void {
	if (typeof window !== 'undefined') {
		window.location.href = getDraftUrl(slug, enableDraft)
	} else {
		console.warn('redirectToDraft can only be used in client components')
	}
}

/**
 * Server-side redirect to draft mode
 * Can only be used in server components or route handlers
 * @param slug The content slug to view in draft mode
 * @param enableDraft Optional flag to explicitly enable draft mode in non-production environments
 */
export async function serverRedirectToDraft(slug: string, enableDraft = true) {
	const { redirect } = await import('next/navigation')
	redirect(getDraftUrl(slug, enableDraft))
} 