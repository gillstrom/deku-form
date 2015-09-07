# deku-form

> Form components for deku


## Install

```
$ npm install --save deku-form
```


## Usage

```js
import {Form, InputField} from 'deku-form';

export function render() {
	function handle(data, form) {
		console.log(data);
		//=> 'username=foo&password=unicorn'
	}

	return (
		<Form onSubmit={handle}>
			<InputField name="username" label="Username" required/>
			<InputField name="password" label="Password" minLength="6" required/>
			<button type="submit">Sign in</button>
		</Form>
	);
}
```


## License

MIT © [Kevin Mårtensson](http://github.com/kevva)
