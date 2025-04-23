import { draftMode } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  // Check if draft mode is enabled
  const { isEnabled } = await draftMode()
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Wedding App</h1>
        
        {isEnabled && (
          <div className="bg-purple-100 border-purple-500 border p-4 mb-4 rounded-md w-full">
            <p className="text-purple-700">
              Draft mode is enabled. You&apos;re viewing unpublished content.
            </p>
            <Link 
              href="/api/disable-draft" 
              className="text-purple-700 underline mt-2 inline-block"
            >
              Disable draft mode
            </Link>
          </div>
        )}
        
        <div className="bg-gray-50 p-6 rounded-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Content Management</h2>
          <p className="mb-4">
            This site is connected to Contentful. You can manage the landing page content in the Contentful dashboard.
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Edit the landing page content in Contentful</li>
            <li>Preview changes with draft mode before publishing</li>
            <li>Content changes will automatically update the site</li>
          </ul>
          <div className="mt-4">
            <Link 
              href="/landing" 
              className="text-blue-600 hover:text-blue-800"
            >
              View Landing Page →
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link href="/landing" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          Landing Page
        </Link>
        <Link href="/api/draft?secret=your_preview_secret&slug=landing" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          Preview Landing Page
        </Link>
      </footer>
    </div>
  );
}
