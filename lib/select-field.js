/** @jsx dom */
import dom from 'magic-virtual-element';
import * as Field from '../field';
import * as Select from '../select';

export const propTypes = {
	class: {
		type: 'string'
	},
	disabled: {
		type: 'boolean'
	},
	error: {
		type: 'string'
	},
	id: {
		type: 'string'
	},
	hint: {
		type: 'string'
	},
	label: {
		type: 'string'
	},
	name: {
		type: 'string'
	},
	onChange: {
		type: 'function'
	},
	placeholder: {
		type: 'string'
	},
	required: {
		type: 'boolean'
	},
	size: {
		type: 'number'
	},
	validationMessage: {
		type: 'function'
	},
	value: {
		type: 'string'
	}
};

export const defaultProps = {
	validationMessage(validity, el) {
		return el.validationMessage;
	}
};

export function render({props, state}, setState) {
	const {disabled, name, options, placeholder, size, value} = props;
	const {hint, id, label} = props;
	const {required} = props;
	const {onChange} = props;
	const error = props.error || state.error;
	const fieldAttrs = {error, hint, id, label};
	const selectAttrs = {
		disabled, id, name, options, placeholder, required, size, value
	};

	function checkError(e) {
		const el = e.target;
		const validity = el.validity;
		setState({error: props.validationMessage(validity, el)});
	}

	function handleChange(e) {
		if (onChange) {
			onChange(e);
		}

		checkError(e);
	}

	return (
		<Field class={['SelectField', props.class]} {...fieldAttrs}>
			<Select {...selectAttrs} onChange={handleChange} onInvalid={checkError} />
		</Field>
	);
}

export function afterRender({props}, el) {
	const input = el.querySelector('select');
	input.setCustomValidity(props.error || '');
}
