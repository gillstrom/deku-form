/** @jsx dom */
import dom from 'magic-virtual-element';

export const propTypes = {
	class: {
		type: 'string'
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
	}
};

export function render({props}) {
	const controls = <div class='FormField-controls'>{props.children}</div>;
	const label = props.label ? <label class='FormField-label' for={props.id}>{props.label}</label> : null;
	const error = props.error ? <div class='FormField-error' innerHTML={props.error}/> : null;
	const hint = props.hint ? <div class='FormField-hint' innerHTML={props.hint}/> : null;
	const classes = {
		FormField: true,
		'has-error': Boolean(error)
	};

	return (
		<div class={[classes, props.class]}>
			{label}
			{controls}
			{error}
			{hint}
		</div>
	);
}
