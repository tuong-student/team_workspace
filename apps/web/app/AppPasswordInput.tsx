import {
	Box,
	PasswordInput,
	PasswordInputProps,
	Popover,
	Progress,
	Text
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useState } from 'react'

function PasswordRequirement({
	meets,
	label
}: {
	meets: boolean
	label: string
}) {
	return (
		<Text
			color={meets ? 'teal' : 'red'}
			sx={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size='sm'
		>
			{meets ? (
				<IconCheck size='0.9rem' />
			) : (
				<IconX size='0.9rem' />
			)}{' '}
			<Box ml={10}>{label}</Box>
		</Text>
	)
}

const requirements = [
	{ re: /[0-9]/, label: 'Includes number' },
	{ re: /[a-z]/, label: 'Includes lowercase letter' },
	{ re: /[A-Z]/, label: 'Includes uppercase letter' },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' }
]

function getStrength(password: string) {
	let multiplier = password.length > 7 ? 0 : 1

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1
		}
	})

	return Math.max(
		100 - (100 / (requirements.length + 1)) * multiplier,
		10
	)
}

export default function AppPasswordInput(inputProps: PasswordInputProps) {
	const [popoverOpened, setPopoverOpened] = useState(false)
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(inputProps.value as string)}
		/>
	))

	const strength = getStrength(inputProps.value as string)
	const color =
		strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

	return (
		<Popover
			opened={popoverOpened}
			position='bottom'
			width='target'
			transitionProps={{ transition: 'pop' }}
		>
			<Popover.Target>
				<div
					onFocusCapture={() =>
						setPopoverOpened(true)
					}
					onBlurCapture={() =>
						setPopoverOpened(false)
					}
				>
					<PasswordInput
						size={'xl'}
						classNames={{
							input: 'bg-transparent border-neutral-500',
							innerInput: 'text-white'
						}}
						withAsterisk
						label={
							<span className='text-white font-bold text-[16px]'>
								Password
							</span>
						}
						{...inputProps}
					/>
				</div>
			</Popover.Target>
			<Popover.Dropdown>
				<Progress
					color={color}
					value={strength}
					size={5}
					mb='xs'
				/>
				<PasswordRequirement
					label='Includes at least 8 characters'
					meets={
						(inputProps.value as string)
							.length > 7
					}
				/>
				{checks}
			</Popover.Dropdown>
		</Popover>
	)
}
