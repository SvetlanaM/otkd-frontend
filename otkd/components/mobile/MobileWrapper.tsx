interface MobileWrapperProps {
	children: React.ReactNode
}
const MobileWrapper = ({children}: MobileWrapperProps) => (
	<div className="bg-blue-dark min-h-screen text-white flex flex-col items-center leading-2 font-light tracking-wide px-8 lg:px-0 justify-center lg:justify-start">
		<section className="mt-12 mb-10 lg:mb-0">{children}</section>
	</div>
)

export default MobileWrapper
