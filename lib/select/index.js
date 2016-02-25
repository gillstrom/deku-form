/** @jsx dom */
import dom from 'magic-virtual-element';

function options(opts, val, placeholder) {
	opts = opts || [];

	if (placeholder) {
		opts.unshift({label: placeholder});
	}

	return opts.map(item => {
		return typeof item === 'object' ? item : {
			value: item,
			label: item
		};
	}).map(item => {
		return (
			<option selected={item.value === val} value={item.value}>
				{item.label}
			</option>
		);
	});
}

export const propTypes = {
	disabled: {
		type: 'boolean'
	},
	id: {
		type: 'string'
	},
	name: {
		type: 'string'
	},
	onChange: {
		type: 'function'
	},
	options: {
		type: 'array'
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
	value: {
		type: 'string'
	}
};

export function render({props}) {
	const {disabled, id, name, required, size} = props;
	const {onChange} = props;
	const selectAttrs = {disabled, id, name, required, size, onChange};

	return (
		<select {...selectAttrs}>
			{options(props.options, props.value, props.placeholder)}
		</select>
	);
}
