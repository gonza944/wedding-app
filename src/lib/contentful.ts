import { createClient } from 'contentful'

export const contentfulClient = (preview = false) => {
	return createClient({
		space: process.env.CONTENTFUL_SPACE_ID as string,
		accessToken: preview
			? (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string)
			: (process.env.CONTENTFUL_ACCESS_TOKEN as string),
		host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
	})
}

export type ContentfulEntry<T> = {
	sys: {
		id: string
		createdAt: string
		updatedAt: string
	}
	fields: T
} 