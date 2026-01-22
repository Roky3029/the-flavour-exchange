import { DefaultMantineColor } from '@mantine/core'
import { showNotification as sN } from '@mantine/notifications'

export const showNotification = (
	title: string,
	message: string,
	autoClose: number,
	color: DefaultMantineColor,
	onClose?: () => void,
	loading?: boolean
) => {
	return sN({
		title,
		message,
		onClose,
		autoClose: autoClose > 0 ? autoClose : false,
		color,
		loading,
		withCloseButton: false
	})
}
