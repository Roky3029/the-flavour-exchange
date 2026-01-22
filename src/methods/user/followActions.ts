'use server'

import User from '@/models/User'
import { User as UserType } from '@/types/user'

export const followUser = async (
	userFollowingId: string,
	userToBeFollowedId: string
) => {
	const userFollowing: UserType | null = await User.findById(userFollowingId) // The user that has clicked on the "follow" button
	const userToBeFollowed: UserType | null = await User.findById(
		userToBeFollowedId
	) // The user which is now being followed

	if (!userFollowing || !userToBeFollowed) return false

	const newFollowingArray = [...userFollowing.following, userToBeFollowedId]

	const newUser = await User.findByIdAndUpdate(userFollowingId, {
		following: newFollowingArray
	})
	const newFollowedUser = await User.findByIdAndUpdate(userToBeFollowedId, {
		followerCount: userToBeFollowed.followerCount + 1
	})

	if (!newUser || !newFollowedUser) return false

	return true
}

export const unfollowUser = async (
	userFollowingId: string,
	userToBeUnfollowedId: string
) => {
	const userFollowing: UserType | null = await User.findById(userFollowingId) // The user that has clicked on the "follow" button
	const userToBeFollowed: UserType | null = await User.findById(
		userToBeUnfollowedId
	) // The user to remove from followed

	if (!userFollowing || !userToBeFollowed) return false

	const newFollowingArray = userFollowing.following.filter(
		u => u === userToBeUnfollowedId
	)

	const newUser = await User.findByIdAndUpdate(userFollowingId, {
		following: newFollowingArray
	})
	const newFollowedUser = await User.findByIdAndUpdate(userToBeUnfollowedId, {
		followerCount: userToBeFollowed.followerCount - 1
	})

	if (!newUser || !newFollowedUser) return false

	return true
}
