import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'

const MobileDescription = (): JSX.Element => {
	const ref = useRef(null)

	useEffect(() => {
		ref.current && Number(window.innerWidth) < 780 && setShowMore(false)
	}, [ref])

	const [showMore, setShowMore] = useState(true)
	return (
		<div
			className="mt-6 font-lighter leading-1 tracking-wide text-sm text-purple-light"
			ref={ref}>
			Dokument je možné nahrať priamo v aplikácii, prípadne sa ním preukázať na
			štarte v deň pretekov.
			<br />
			<br />
			{ref.current && Number(window.innerWidth) < 780 && (
				<button
					onClick={() => setShowMore(!showMore)}
					className="w-full focus:outline-none">
					{!showMore ? (
						<div className="flex justify-between w-full">
							<p>Viac informácií</p>
							<Image
								src={'/icons/right.svg'}
								alt="Sipka"
								width={20}
								height={20}
							/>
						</div>
					) : (
						<div className="flex justify-between w-full">
							<p>Skryť</p>
							<Image
								src={'/icons/right.svg'}
								alt="Sipka"
								width={20}
								height={20}
								className="rotate-90 transform"
							/>
						</div>
					)}
				</button>
			)}
			{showMore && (
				<ol className="mt-3.5">
					<li>
						1. Maximálne 7 dní staré PCR vyšetrenie na prítomnosť vírusu
						SARS-CoV-2 s negatívnym výsledkom,
					</li>
					<li>
						2. Maximálne 72 hodín staré antigénové testovanie s negatívnym
						výsledkom,
					</li>
					<li>
						3. Očkovanie proti ochoreniu COVID-19 (14 dní po druhej dávke alebo
						21 dní po prvej dávke) formou certifikátu alebo QR kódu
					</li>
					<li>
						4. Maximálne 180 dní staré laboratórne potvrdenie o prekonaní
						ochorenia COVID-19
					</li>
				</ol>
			)}
		</div>
	)
}

export default MobileDescription
