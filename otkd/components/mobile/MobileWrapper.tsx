interface MobileWrapperProps {
	children: React.ReactNode
}
const MobileWrapper = ({children}: MobileWrapperProps) => (
	<div className="bg-blue-dark min-h-screen text-white flex flex-col items-center leading-2 font-light tracking-wide px-8 lg:px-0 justify-start md:justify-center">
		<section className="w-full md:w-3/4 px-2 md:px-10 mt-12 md:mt-0 mb-12 md:mb-0">
			{children}
		</section>
	</div>
)

export default MobileWrapper
