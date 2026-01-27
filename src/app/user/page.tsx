import { Navbar } from '@/components/Navbar'
import MainBanner from './components/MainBanner'
import { getSession } from '@/methods/user/getSession'
import { User as UserType } from '@/types/user'
import User from '@/models/User'
import { getFollowingCount } from '@/methods/user/getFollowingCount'
import { checkIfUserIsLogged } from '@/utils/checkIfUserIsLogged'
import { Data } from '@/types/recipe'
import RecipesWrapper from './components/RecipesWrapper'

export type DataFetch = () => Promise<{
	recipes: Data[]
	userData: UserType | null
}>

export default async function UserPage() {
	await checkIfUserIsLogged()
	const session = await getSession()

	const userData = await User.findById(session?.user.id)

	if (!userData) return

	return (
		<div className='pb-32'>
			<Navbar wantMarginBottom />

			<MainBanner
				name={session?.user.name as string}
				following={(await getFollowingCount(userData._id)) as number}
				followers={userData.followerCount}
			/>

			<RecipesWrapper sessionId={session?.user.id as string} />
		</div>
	)
}
