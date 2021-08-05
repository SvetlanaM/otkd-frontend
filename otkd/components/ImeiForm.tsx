import {useState} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'

import {TextInputItem} from './TextInputItem'

type FormInputs = {
	team_number: number
	imei_number: string
}

interface ImeiFormProps {
	onSubmit: (formData: FormInputs) => Promise<any>
}

const ImeiForm = ({onSubmit}: ImeiFormProps) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm()
	const [[message, type], setMessage] = useState<string[]>([])

	const onSubmitForm: SubmitHandler<FormInputs> = (data) =>
		onSubmit(data)
			.then((data) => {
				if (data.old_data.length === 1) {
					return setMessage([
						`Data zmenene. Prechadzajuci tim ${data.old_data[0].team_number} s predchadzaujecim IMEI ${data.old_data[0].imei}.`,
						'bg-green',
					])
				}

				if (data && data.old_data.length === 2) {
					return setMessage([
						`Dáta zmenené pre tímy: ${data.old_data
							.map((team) => team.team_number)
							.join(', ')}`,
						'bg-orange',
					])
				}

				return setMessage([`Nový tím a tracker založený.`, 'bg-green'])
			})
			.then(() => setTimeout(() => setMessage([]), 8000))
			.catch(() =>
				setMessage([
					`Nastala chyba. Skúste neskôr alebo skontrolujte zadané dáta.`,
					'bg-red-500',
				])
			)
			.then(() => setTimeout(() => setMessage([]), 8000))

	return (
		<div className="w-full md:w-2/6">
			{message && (
				<div className={`w-full ${type} text-white py-5 px-4 rounded`}>
					{message}
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmitForm)} className="w-full">
				<TextInputItem
					id="team_number"
					label="Číslo tímu*"
					type="number"
					register={register}
					error={errors}
				/>
				<TextInputItem
					id="imei_number"
					label="IMEI číslo*"
					type="text"
					register={register}
					error={errors}
				/>
				<button
					type="submit"
					className="mt-5 flex w-full bg-orange text-white text-center justify-center p-3 rounded-md hover:bg-purple-medium">
					Zmeniť IMEI tímu
				</button>
			</form>
		</div>
	)
}

export default ImeiForm
