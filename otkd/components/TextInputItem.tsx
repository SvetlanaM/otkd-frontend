import {
	appendErrors,
	DeepMap,
	FieldError,
	FieldValues,
	useForm,
	UseFormRegister,
	UseFormRegisterReturn,
} from 'react-hook-form'
import TextInput from './InputType'

type formRulesType = {
	team_number: Object
	imei_number: Object
}
interface TextInputItemProps {
	id: string | keyof formRulesType
	label: string
	type: string
	register: UseFormRegister<FieldValues>
}

export const TextInputItem = ({
	id,
	label,
	type,
	register,
	error,
}: TextInputItemProps & {
	error?: DeepMap<FieldValues, FieldError>
}): JSX.Element => {
	const minLength = 5
	const imeiFormStyle = [
		'focus:ring-purple-medium focus:border-purple-medium',
		'border-blue-dark',
	]
	const team_numbers = Array.from(Array(250).keys())

	const isTeamNumber = (team_number: number) =>
		team_numbers.includes(Number(team_number))

	const formRules: formRulesType = {
		team_number: {
			required: true,
			minLength: 1,
			maxLength: 5,
			validate: isTeamNumber,
		},
		imei_number: {
			required: true,
			minLength: 1,
			maxLength: 50,
		},
	}

	const errorResponses: formRulesType = {
		team_number: {
			required: 'Číslo tímu je povinné',
			maxLength: 'Číslo tímu nemôže mať viac ako 5 znakov',
			validate: 'Neplatné číslo tímu',
		},
		imei_number: {
			required: 'Číslo IMEI je povinné',
			maxLength: 'Číslo IMEI nemôže mať viac ako 50 znakov',
		},
	}

	const getFormRules = (key: keyof formRulesType) => formRules[key]

	const errorTypes = ['required', 'minLength', 'maxLength', 'validate']

	const getErrorMessage = (
		error: DeepMap<FieldValues, FieldError>,
		type: string
	): JSX.Element => {
		console.log(id)
		return error[id] && error[id].type === type && errorResponses[id][type]
	}

	return (
		<div>
			<TextInput
				inputProps={{
					'name': id,
					'id': id,
					'type': type,
					'aria-required': true,
				}}
				labelText={label}
				register={register(id, getFormRules(id))}
				extraClassNames={imeiFormStyle}
			/>
			{error && (
				<span className="text-red-500" role="alert" aria-live="assertive">
					{errorTypes.map((errorValue) => getErrorMessage(error, errorValue))}
				</span>
			)}
		</div>
	)
}
