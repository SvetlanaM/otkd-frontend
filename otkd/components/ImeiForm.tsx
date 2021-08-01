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
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<TextInputItem
				id="team_number"
				label="team_number"
				type="number"
				register={register}
			/>
			<TextInputItem
				id="imei_number"
				label="team_number"
				type="number"
				register={register}
			/>
			<button type="submit">SetValue</button>
		</form>
	)
}

export default ImeiForm
