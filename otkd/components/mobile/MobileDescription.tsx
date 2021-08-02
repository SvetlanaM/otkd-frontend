import {useState} from 'react'

const MobileDescription = (): JSX.Element => {
	const [showMore, setShowMore] = useState(false)
	return (
		<div className="mt-4 font-lighter leading-1 tracking-wide text-sm text-purple-light">
			Dokument je možné nahrať priamo v aplikácii, prípadne sa ním preukázať na
			štarte v deň pretekov.
			<br />
			<br />
			<button onClick={() => setShowMore(!showMore)}>
				{!showMore ? 'Viac informácií' : 'Skryť'}
			</button>
			{showMore && (
				<ol className="mt-3">
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
