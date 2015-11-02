/** @jsx dom */
import dom from 'magic-virtual-element';
import * as Field from '../field';

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
	maxLength: {
		type: 'number'
	},
	minLength: {
		type: 'number'
	},
	multiline: {
		type: 'boolean'
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
	validationMessage(validity, el) {
		return el.validationMessage;
	}
};

export function render({props, state}, setState) {
	let control;

	const {disabled, name, placeholder, readonly, size, value} = props;
	const {hint, id, label} = props;
	const {maxLength, minLength, pattern, required} = props;
	const {onChange, onInput} = props;
	const error = props.error || state.error;
	const validate = props.validate || state.validate;
	const fieldAttrs = {error, hint, id, label, name};
	const controlAttrs = {
		disabled, id, name, placeholder, readonly, size,
		maxLength, minLength, pattern, required,
		onChange: handleChange,
		onInput: handleInput,
		onInvalid: handleInvalid
	};

	if (props.multiline) {
		control = <textarea {...controlAttrs}>{value}</textarea>;
	} else {
		control = <input {...controlAttrs} value={String(value || '')}/>;
	}

	function checkError(e) {
		const el = e.target;
		const validity = el.validity;
		setState({error: props.validationMessage(validity, el)});
	}

	function handleChange(e) {
		if (onChange) {
			onChange(e);
		}

		if (validate) {
			checkError(e);
		}
	}

	function handleInput(e) {
		if (onInput) {
			onInput(e);
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
		<Field class={['TextField', props.class]} {...fieldAttrs}>
			{control}
		</Field>
	);
}

export function afterRender({props}, el) {
	const input = el.querySelector('input, textarea');
	input.setCustomValidity(props.error || '');
}
