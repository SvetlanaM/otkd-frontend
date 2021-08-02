import type {ComponentPropsWithoutRef, Ref} from 'react'
import {UseFormRegisterReturn} from 'react-hook-form'

type InputType = keyof Pick<JSX.IntrinsicElements, 'input' | 'textarea'>
type InputTypeMap<T extends InputType> = T extends 'input'
	? HTMLInputElement
	: T extends 'textarea'
	? HTMLTextAreaElement
	: HTMLElement

interface BaseProps<T extends InputType> {
	labelText: string
	inputProps:
		| {name: string; id: string} & Omit<
				ComponentPropsWithoutRef<T>,
				'className' | 'ref'
		  >
	inputRef?: Ref<InputTypeMap<T>> | UseFormRegisterReturn
	extraClassNames?: string[]
	register: any
}

type Props =
	| ({multiline?: false} & BaseProps<'input'>)
	| ({multiline: true} & BaseProps<'textarea'>)

const TextInput = (props: Props): JSX.Element => {
	const inputElement = props.multiline ? (
		<textarea {...props.inputProps} />
	) : (
		<input
			{...props.inputProps}
			{...props.register}
			className={`p-2 form-input mt-1 block w-full border-1 rounded ${props.extraClassNames?.join(
				' '
			)}`}
		/>
	)

	return (
		<div className="my-3 rounded-md text-left">
			<label htmlFor={props.inputProps.id} className="block mb-2">
				<span className="text-gray-700 font-bold">{props.labelText}</span>
			</label>
			{inputElement}
		</div>
	)
}

export default TextInput
