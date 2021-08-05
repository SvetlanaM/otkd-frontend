import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<>
						<link rel="preload" href="https://fonts.googleapis.com" />
						<link
							rel="preconnect"
							href="https://fonts.gstatic.com"
							crossOrigin="anonymous"
							as="font"
						/>
						<link
							href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap"
							rel="preload"
							crossOrigin="anonymous"
							as="font"
						/>
					</>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
