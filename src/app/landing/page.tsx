import { draftMode } from 'next/headers'
import { getLandingPage } from '@/lib/contentful/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function LandingPage() {
	// Check if draft mode is enabled
	const { isEnabled } = await draftMode()
	
	// Fetch landing page with preview mode if draft mode is enabled
	const landingPage = await getLandingPage('landing', isEnabled)
	
	// If the landing page doesn't exist, return 404
	if (!landingPage) {
		notFound()
	}
	
	// Extract fields from the landing page
	const {
		title,
		subtitulo,
		mostrarCuentaRegresiva,
		pricePerPerson,
		seccionDeHorarioYLugarDeLaFiesta,
		codigoDeVestimenta,
		formularioDeAsistencia
	} = landingPage.fields
	
	return (
		<main className="container mx-auto py-8 px-4">
			{isEnabled && (
				<div className="bg-purple-100 border-purple-500 border p-4 mb-6 rounded-md">
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
			
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">{title}</h1>
				{subtitulo && <p className="text-xl text-gray-600">{subtitulo}</p>}
			</div>
			
			{mostrarCuentaRegresiva && (
				<div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
					<h2 className="text-2xl font-semibold mb-4">Cuenta Regresiva</h2>
					<p className="text-3xl font-bold text-blue-600">
						{/* This would be replaced with an actual countdown component */}
						00:00:00:00
					</p>
				</div>
			)}
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-semibold mb-4">Horario y Lugar</h2>
					<div className="whitespace-pre-line">
						{seccionDeHorarioYLugarDeLaFiesta}
					</div>
				</div>
				
				{codigoDeVestimenta && (
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-2xl font-semibold mb-4">Código de Vestimenta</h2>
						<div className="whitespace-pre-line">
							{codigoDeVestimenta}
						</div>
					</div>
				)}
			</div>
			
			<div className="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 className="text-2xl font-semibold mb-4">Precio por Persona</h2>
				<p className="text-3xl font-bold text-green-600">${pricePerPerson}</p>
			</div>
			
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-2xl font-semibold mb-4">Formulario de Asistencia</h2>
				<div className="bg-gray-50 p-4 rounded-md text-gray-500">
					<p>El formulario de asistencia sería implementado aquí.</p>
					<pre className="mt-2 text-xs overflow-auto p-2 bg-gray-100 rounded">
						{JSON.stringify(formularioDeAsistencia, null, 2)}
					</pre>
				</div>
			</div>
			
			<div className="mt-8 text-center">
				<Link href="/" className="text-blue-600 hover:text-blue-800">
					← Volver al inicio
				</Link>
			</div>
		</main>
	)
} 