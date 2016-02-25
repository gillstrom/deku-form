/** @jsx dom */
import dom from 'magic-virtual-element';
import * as Field from '../field';

export const propTypes = {
	autocomplete: {
		type: 'boolean'
	},
	checked: {
		type: 'boolean'
	},
	class: {
		type: 'string'
	},
	disabled: {
		type: 'boolean'
	},
	error: {
		type: 'string'
	},
	hint: {
		type: 'string'
	},
	id: {
		type: 'string'
	},
	label: {
		type: 'string'
	},
	max: {
		type: 'number'
	},
	maxLength: {
		type: 'number'
	},
	min: {
		type: 'number'
	},
	minLength: {
		type: 'number'
	},
	name: {
		type: 'string'
	},
	onChange: {
		type: 'function'
	},
	onInput: {
		type: 'function'
	},
	pattern: {
		type: 'string'
	},
	placeholder: {
		type: 'string'
	},
	readonly: {
		type: 'boolean'
	},
	required: {
		type: 'boolean'
	},
	size: {
		type: 'number'
	},
	type: {
		type: 'string'
	},
	validate: {
		type: 'boolean'
	},
	validationMessage: {
		type: 'function'
	},
	value: {
		type: 'string'
	}
};

export const defaultProps = {
	type: 'text',
	validationMessage(valid, el) {
		return el.validationMessage;
	}
};

export function render({props, state}, setState) {
	const {autocomplete, checked, disabled, name, placeholder, readonly, size, type, value} = props;
	const {hint, id, label} = props;
	const {max, maxLength, min, minLength, pattern, required, step} = props;
	const {onChange, onInput} = props;
	const error = props.error || state.error;
	const validate = props.validate || state.validate;
	const fieldAttrs = {error, hint, id, label};
	const inputAttrs = {
		autocomplete, checked, disabled, id, name, placeholder, readonly, size, type,
		max, maxLength, min, minLength, pattern, required, step,
		value: value
	};

	function checkError(e) {
		const el = e.target;
		const validity = el.validity;
		setState({error: props.validationMessage(validity, el)});
	}

	function handleInput(e) {
		if (onInput) {
			onInput(e);
		}

		if (validate) {
			checkError(e);
		}
	}

	function handleChange(e) {
		if (onChange) {
			onChange(e);
		}

		if (validate) {
			checkError(e);
		}
	}

	function handleInvalid(e) {
		setState({validate: true});
		checkError(e);
	}

	return (
		<Field class={['InputField', props.class]} {...fieldAttrs}>
			<input {...inputAttrs} onChange={handleChange} onInput={handleInput} onInvalid={handleInvalid}/>
		</Field>
	);
}

export function afterRender({props}, el) {
	const input = el.querySelector('input');
	input.setCustomValidity(props.error || '');
}
