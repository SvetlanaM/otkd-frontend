import Link from 'next/link'
import {APP_NAME} from '../utils/constant'
import {useRouter} from 'next/router'

interface MainContentWithHeaderProps {
	children: React.ReactNode
}

const MainContentWithHeader = ({
	children,
}: MainContentWithHeaderProps): JSX.Element => {
	const router = useRouter()

	return (
		<div className="min-h-screen font-sans leading-normal tracking-normal">
			<nav className="bg-blue-dark fixed w-full z-10 top-0 shadow text-white py-3">
				<div className="w-full container mx-auto flex justify-between">
					<div className="w-1/2 text-left px-10 font-medium">{APP_NAME}</div>
					<ul className="w-auto px-10 font-medium flex pull-right">
						<li className="px-2">
							<Link href="/admin">
								<a
									className={`hover:text-purple-light ${
										router.pathname === '/admin' && 'text-purple-light'
									}`}>
									COVID-19 prehľad
								</a>
							</Link>
						</li>
						<li className="px-2">
							<Link href="/imei">
								<a
									className={`hover:text-purple-light ${
										router.pathname === '/imei' && 'text-purple-light'
									}`}>
									Zmena IMEI
								</a>
							</Link>
						</li>
						<li className="px-2">Administrátor</li>
					</ul>
				</div>
			</nav>
			<div className="mt-12 py-8 px-10 justify-center flex">{children}</div>
		</div>
	)
}

export default MainContentWithHeader
