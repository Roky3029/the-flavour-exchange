import { checkIfUserIsLogged } from '@/utils/checkIfUserIsLogged'
import PageClient from './components/PageClient'

export default async function RecipesSearch() {
	await checkIfUserIsLogged()
	return <PageClient />
}
