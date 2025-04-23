import { contentfulClient } from '../contentful'
import { ContentfulEntry, LandingPage } from './types'

// Generic function to fetch entries by content type
export async function getEntriesByType<T>(
	contentType: string,
	preview = false,
	options: Record<string, string | number | boolean | string[]> = {}
): Promise<ContentfulEntry<T>[]> {
	const client = contentfulClient(preview)
	const entries = await client.getEntries({
		content_type: contentType,
		...options,
	})

	// Need to cast because Contentful types don't match our custom types
	return entries.items as unknown as ContentfulEntry<T>[]
}

// Generic function to fetch a single entry by slug
export async function getEntryBySlug<T>(
	contentType: string,
	slug: string,
	preview = false
): Promise<ContentfulEntry<T> | null> {
	const client = contentfulClient(preview)
	const entries = await client.getEntries({
		content_type: contentType,
		'fields.slug': slug,
		limit: 1,
	})

	return entries.items.length > 0
		? (entries.items[0] as unknown as ContentfulEntry<T>)
		: null
}

// Functions for landing page
export async function getLandingPage(
	slug: string = 'main',
	preview = false
): Promise<ContentfulEntry<LandingPage> | null> {
	return getEntryBySlug<LandingPage>('landingPage', slug, preview)
}

export async function getAllLandingPages(
	preview = false
): Promise<ContentfulEntry<LandingPage>[]> {
	return getEntriesByType<LandingPage>('landingPage', preview)
} 