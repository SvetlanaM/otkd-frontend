import {
	FieldError,
	FieldValues,
	useForm,
	UseFormRegister,
	UseFormRegisterReturn,
} from 'react-hook-form'
import TextInput from './InputType'

interface TextInputItemProps {
	id: string
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
}: TextInputItemProps & {error?: FieldError}): JSX.Element => {
	const minLength = 5
	const imeiFormStyle = [
		'focus:ring-purple-medium focus:border-purple-medium',
		'border-blue-dark',
	]
	return (
		<div>
			<TextInput
				inputProps={{
					'name': id,
					'id': id,
					'type': type,
					'required': true,
					'minLength': minLength,
					'aria-required': true,
				}}
				labelText={label}
				register={register(id)}
				extraClassNames={imeiFormStyle}
			/>
			{error && (
				<div className="error" role="alert" aria-live="assertive">
					{error.message}
				</div>
			)}
		</div>
	)
}
