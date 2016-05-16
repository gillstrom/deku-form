/** @jsx dom */
import dom from 'magic-virtual-element';
import * as Field from '../field';

export const propTypes = {
	checked: {
		type: 'boolean'
	},
	class: {
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
	required: {
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
	const {checked, name, value} = props;
	const {hint, label} = props;
	const {required} = props;
	const {onChange} = props;
	const {error} = state;
	const fieldAttrs = {error, hint};
	const inputAttrs = {
		checked, name, required,
		type: 'radio',
		value: value
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
		<Field class={['RadioField', props.class]} {...fieldAttrs}>
			<label>
				<input {...inputAttrs} onChange={handleChange} onInvalid={checkError}/>
				{label}
			</label>
		</Field>
	);
}
