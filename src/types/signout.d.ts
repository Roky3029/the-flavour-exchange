interface Data<T> {
	data: T
}

interface Error$1<T> {
	error: T
}

export type SignOutResponse =
	| Data<{ success: boolean }>
	| Error$1<{ code?: string; message?: string }>
