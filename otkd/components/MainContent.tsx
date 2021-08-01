import {APP_NAME} from '../utils/constant'

interface MainContentWithHeaderProps {
	children: React.ReactNode
}

const MainContentWithHeader = ({
	children,
}: MainContentWithHeaderProps): JSX.Element => (
	<div className="min-h-screen font-sans leading-normal tracking-normal">
		<nav className="bg-blue-dark fixed w-full z-10 top-0 shadow text-white">
			<div className="w-full container mx-auto flex flex-wrap items-center py-3">
				<div className="w-full text-center font-medium">{APP_NAME}</div>
			</div>
		</nav>
		<div className="mt-12 py-8 px-10 justify-center flex">{children}</div>
	</div>
)

export default MainContentWithHeader
