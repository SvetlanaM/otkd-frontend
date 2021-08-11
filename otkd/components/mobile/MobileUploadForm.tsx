import {useMemo, useState} from 'react'
import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {VaccinationTypeEnum} from '../../utils/constant'
import {useS3Upload} from 'next-s3-upload'
import TeamsAPI from '../../api/covid'
import Image from 'next/image'
import Loading from '../Loading'

type FormInputs = {
	vaccination_type: string
	document_url: string
}

interface MobileUploadFormProps {
	team_number: number
	runner_id: number
}

const MobileUploadForm = ({team_number, runner_id}: MobileUploadFormProps) => {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		reset,
		formState: {errors},
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			vaccination_type: 'antigen_test',
			document_url: '',
		},
	})

	const [[message, type], setMessage] = useState<string[]>([])
	const [documentName, setDocumentName] = useState<string>('')
	const [documentUrl, setDocumentUrl] = useState<string>('')

	const {FileInput, openFileDialog, uploadToS3} = useS3Upload()

	const handleFileChange = async (file: File) => {
		if (file.size < 5000000) {
			setIsLoading(true)
			let {url} = await uploadToS3(file)
			setDocumentName(file.name)
			setDocumentUrl(url)
			setValue('document_url', file.name)
			setIsLoading(false)
		} else {
			setMessage([
				`Maximálna veľkosť nahrávaného súboru je 5MB. Nahrajte prosím súbor v menšej veľkosti.`,
				'bg-red-500',
			])
			setTimeout(() => setMessage([]), 5000)
		}
	}

	const vaccinationTypeOptions = useMemo(() => {
		return Object.keys(VaccinationTypeEnum).map((key) => {
			return (
				<option value={key} key={key}>
					{VaccinationTypeEnum[key]}
				</option>
			)
		})
	}, [])

	const onSubmitForm: SubmitHandler<FormInputs> = async (
		formData
	): Promise<any> => {
		await TeamsAPI.create_confirmation(
			team_number,
			runner_id,
			documentUrl,
			formData.vaccination_type
		)
			.then(() => setDocumentUrl(''))
			.then(() => {
				setMessage([
					`Dokument úspešne nahratý organizátorovi. Behu zdar :)`,
					'bg-green',
				])
			})
			.then(() => setTimeout(() => setMessage([]), 6000))
			.catch(() => setMessage([`Nastala chyba. Skúste neskôr.`, 'bg-red-500']))
			.then(() => setTimeout(() => setMessage([]), 5000))
			.then(() =>
				reset({
					vaccination_type: 'antigen_test',
					document_url: '',
				})
			)
	}

	const [isLoading, setIsLoading] = useState<boolean>(false)

	return (
		<div className="w-full flex flex-col justify-center w-1/2 mt-5">
			{message && (
				<div className={`w-full ${type} text-white py-2 px-4 mb-3 rounded`}>
					{message}
				</div>
			)}

			<form
				onSubmit={handleSubmit(onSubmitForm)}
				className="w-full flex justify-center items-center flex-col">
				<select
					{...register('vaccination_type', {required: true})}
					className="form-select w-full mb-3 mt-2 text-purple block rounded-md bg-purple-medium  border-none
              focus:outline-none focus:bg-purple-medium focus:border-none
              focus:border focus:ring-purple-100 focus:ring-opacity-50 placeholder-gray">
					{vaccinationTypeOptions}
				</select>
				<div className="w-full mt-3">
					<button
						type="button"
						className="w-full py-2.5 px-3 text-purple-light block rounded-md bg-purple-medium  border-none
              focus:outline-none focus:bg-purple-medium focus:border-none
              focus:border focus:ring-purple-100 focus:ring-opacity-50 placeholder-gray text-left outline:none"
						onClick={openFileDialog}>
						<div className="flex items-center">
							<Image
								src={'/icons/file_upload.svg'}
								alt="Nahrat subor"
								width={16}
								priority
								height={16}
								className="mb-0 file-upload-icon mr-3"
							/>{' '}
							<p className="ml-1">Nahrať potvrdenie</p>
						</div>
					</button>
					<Controller
						name="document_url"
						control={control}
						rules={{
							required: true,
						}}
						render={() => (
							<FileInput
								onChange={handleFileChange}
								type="file"
								restrictions={{
									maxFileSize: 5000000,
								}}
							/>
						)}
					/>
					{errors.document_url && (
						<div className="mt-4 text-red-600">Dokument je povinný!</div>
					)}

					<div
						className={`${
							documentUrl && 'mt-4 h-10 mt-2'
						} text-sm text-purple-light flex items-center justify-center`}>
						{!isLoading ? (
							documentUrl && `Dokument načítaný: ${documentName}`
						) : (
							<Loading />
						)}
					</div>
				</div>

				<button
					type="submit"
					disabled={!documentUrl}
					className={`flex w-full text-white text-center justify-center p-2.5 rounded-md font-semibold uppercase ${
						!documentUrl ? 'bg-purple-light mt-6' : 'bg-orange mt-4'
					}`}>
					Nahrať potvrdenie
				</button>
			</form>
		</div>
	)
}

export default MobileUploadForm
