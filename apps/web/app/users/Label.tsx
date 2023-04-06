export default function Label({ children }: { children: React.ReactNode }) {
	return (
		<span className='text-[1.2rem] text-neutral-dark-500 '>
			{children}
		</span>
	)
}
