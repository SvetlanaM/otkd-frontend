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
			.then(
				(data) =>
					data &&
					data.old_data &&
					setMessage([
						`Dáta pre tím ${data.old_data.team_number} zmenené z pôvodného IMEI ${data.old_data.imei}.`,
						'bg-green',
					])
			)
			.then(() => setTimeout(() => setMessage([]), 6000))
			.catch((data) =>
				setMessage([
					`Nastala chyba. Skúste neskôr alebo skontrolujte zadané dáta.`,
					'bg-red-500',
				])
			)
			.then(() => setTimeout(() => setMessage([]), 5000))

	return (
		<div className="block w-2/6">
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
