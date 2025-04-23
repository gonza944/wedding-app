// Common interface for all content types
export interface ContentfulEntry<T> {
	sys: {
		id: string
		createdAt: string
		updatedAt: string
		contentType?: {
			sys: {
				id: string
			}
		}
	}
	fields: T
	metadata?: {
		tags: {
			sys: {
				id: string
			}
		}[]
	}
}

// Landing Page content type
export interface LandingPage {
	slug: string
	title: string
	subtitulo?: string
	mostrarCuentaRegresiva?: boolean
	pricePerPerson: string
	seccionDeHorarioYLugarDeLaFiesta: string
	codigoDeVestimenta?: string
	formularioDeAsistencia: Record<string, unknown>
} 