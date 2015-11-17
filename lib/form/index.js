/** @jsx dom */
import dom from 'magic-virtual-element';
import formSerialize from 'form-serialize';

export const propTypes = {
	onSubmit: {
		type: 'function'
	},
	transform: {
		type: 'function'
	}
};

export function render({props}) {
	const {children, transform, onSubmit} = props;

	function handle(e) {
		e.preventDefault();

		const el = e.target;

		if (el.checkValidity()) {
			const data = formSerialize(el, transform);

			if (onSubmit) {
				onSubmit(data, el, e);
			}
		}
	}

	return (
		<form class={['Form', props.class]} novalidate onSubmit={handle}>
			{children}
		</form>
	);
}
