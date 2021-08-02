import {useForm, SubmitHandler} from 'react-hook-form'
import {TextInputItem} from './TextInputItem'

type FormInputs = {
	team_number: number
	imei_number: number
}

interface ImeiFormProps {
	onSubmit: (formData: FormInputs) => Promise<boolean>
}

const ImeiForm = ({onSubmit}: ImeiFormProps) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm()

	const onSubmitForm: SubmitHandler<FormInputs> = (data) =>
		onSubmit(data)
			.then((data) => data)
			.catch((data) => data.errors)

	return (
		<form onSubmit={handleSubmit(onSubmitForm)} className="w-2/6">
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
				type="number"
				register={register}
				error={errors}
			/>
			<button
				type="submit"
				className="mt-5 flex w-full bg-orange text-white text-center justify-center p-3 rounded-md hover:bg-purple-medium">
				Zmeniť IMEI tímu
			</button>
		</form>
	)
}

export default ImeiForm
