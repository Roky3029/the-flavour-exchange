import { getSession } from '@/methods/user/getSession'
import ClientWrapper from './components/ClientWrapper'

export default async function SearchRecipes() {
	const session = await getSession()

	return <ClientWrapper sessionId={session?.user.id} />
}
