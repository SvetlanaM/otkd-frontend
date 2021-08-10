import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'

const MobileDescription = (): JSX.Element => {
	const ref = useRef(null)

	useEffect(() => {
		ref.current && Number(window.innerWidth) < 780 && setShowMore(false)
	}, [])

	const [showMore, setShowMore] = useState(false)
	return (
		<div
			className="mt-6 font-lighter leading-1 tracking-wide text-sm text-purple-light"
			ref={ref}>
			Dokument je možné nahrať priamo v aplikácii, prípadne sa ním preukázať na
			štarte osobne. Dajte si pozor na certifikáty zabezpečené heslom, nie sú akceptované.
			<a
				onClick={() => setShowMore(!showMore)}
				className="w-full focus:outline-none font-semibold">
				{!showMore ? (
					<div className="flex justify-between w-full mt-4">
						<p>Viac informácií</p>
						<Image
							src={'/icons/right.svg'}
							alt="Sipka"
							width={20}
							height={20}
							priority
						/>
					</div>
				) : (
					<div className="flex justify-between w-full mt-4">
						<p>Skryť</p>
						<Image
							src={'/icons/right.svg'}
							alt="Sipka"
							width={20}
							height={20}
							className="rotate-90 transform"
							priority
						/>
					</div>
				)}
			</a>
			{showMore && (
				<>
					<ol className="mt-3.5">
						<li className="pb-2">
							1. Maximálne 72 hodín staré RT PCR alebo LAMP vyšetrenie na
							prítomnosť vírusu SARS-CoV-2 s negatívnym výsledkom,
						</li>
						<li className="pb-2">
							2. Maximálne 24 hodín staré antigénové testovanie s negatívnym
							výsledkom,
						</li>
						<li className="pb-2">
							3. Najmenej 14 dní, ale nie viac než 12 mesiacov po aplikácii
							druhej dávky očkovacej látky proti ochoreniu COVID-19 s
							dvojdávkovou schémou,
						</li>
						<li className="pb-2">
							4. Najmenej 21 dní, ale nie viac než 12 mesiacov po aplikácii
							prvej dávky očkovacej látky proti ochoreniu COVID-19 s
							jednodávkovou schémou,
						</li>
						<li className="pb-2">
							5. Najmenej 14 dní a nie viac než 12 mesiacov po aplikácii prvej
							dávky očkovacej látky proti ochoreniu COVID-19, ak bola prvá dávka
							očkovania proti ochoreniu COVID-19 podaná v intervale do 180 dní
							od prekonania ochorenia COVID-19,
						</li>
						<li className="pb-2">
							6. Maximálne 180 dní staré laboratórne potvrdenie o prekonaní
							ochorenia COVID-19
						</li>
					</ol>
					<p className="mt-3">
						Dáta sú uchovávané a spracovávané v súlade s opatreniami GDPR.
						Nahratím dokumentu súhlasíte s jeho spracovaním pre potreby
						organizátora, prípadne doložením v rámci kontroly bezpečnostných
						opatrení voči vírusu COVID-19. Potvrdenie o bezinfekčnosti je nutnou
						podmienkou pre účasť na pretekoch OTKD 2021.
					</p>
				</>
			)}
		</div>
	)
}

export default MobileDescription
