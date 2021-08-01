import type {ComponentPropsWithoutRef, Ref} from 'react'

type InputType = keyof Pick<JSX.IntrinsicElements, 'input' | 'textarea'>
type InputTypeMap<T extends InputType> = T extends 'input'
	? HTMLInputElement
	: T extends 'textarea'
	? HTMLTextAreaElement
	: HTMLElement

interface BaseProps<T extends InputType> {
	labelText: string
	inputProps: {name: string; id: string} & Omit<
		ComponentPropsWithoutRef<T>,
		'className' | 'ref'
	>
	inputRef?: Ref<InputTypeMap<T>>
	extraClassNames?: string[]
}

type Props =
	| ({multiline?: false} & BaseProps<'input'>)
	| ({multiline?: true} & BaseProps<'textarea'>)

const TextInput = (props: Props): JSX.Element => {
	const inputElement = props.multiline ? (
		<textarea ref={props.inputRef} {...props.inputProps} className="" />
	) : (
		<input ref={props.inputRef} {...props.inputProps} className="" />
	)

	return (
		<div className="">
			<label htmlFor={props.inputProps.id} className="">
				{props.labelText}
			</label>
			{inputElement}
		</div>
	)
}

export default TextInput
