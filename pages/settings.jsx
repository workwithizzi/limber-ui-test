import { Layout } from '../components/Layout'
import { Textfield } from '../components/forms/Textfield'
import { Radio } from '../components/forms/Radio'
import { Textarea } from '../components/forms/Textarea'
import { Checkbox } from '../components/forms/Checkbox'
import { Toggle } from '../components/forms/Toggle'
import { Numberfield } from '../components/forms/Numberfield'
import { Select } from '../components/forms/Select'


const _testOptions=[{
	value: "dog",
	label: "Dog"
	},{
		value: "cat",
		label: "Cat"
	},{
		value: "hamster",
		label: "Hamster"
}]


export default function SettingsPage() {
	return (
		<Layout
			title="Settings"
			subtitle="Settings here affect the entire site."
		>

			<form className="pure-form pure-form-stacked">

				<Select
					name="selectTest"
					label="This is a select Input"
					hint="this is a hint"
					options={_testOptions}
				/>

				<hr />
				<Checkbox
					id="opt1"
					label="Option 1"
					value="opt1"
					/>
				<Checkbox
					id="opt2"
					label="Option 2 with hint"
					hint="this is a hint"
					value="opt2"
				/>
				<hr />

				<Toggle
					id="toggle2"
					label="Toggle 2 with hint"
					hint="this is a hint"
				/>

				<hr />
				<Radio
					name="options"
					label="Here's an option"
					id="option1"
					value="First Option"
					hint="this one has a tip"
				/>

				<Radio
					name="options"
					label="Here's a second option"
					id="option2"
					value="Second Option"
				/>
				<hr />
				<Textfield
					name="stext"
					label="This is a Short Text field"
					placeholder="Write text here."
					hint="This is help text."
				/>

				<Textfield
					name="stext"
					label="This is a required Short Text field"
					placeholder="Write text here."
					hint="This is help text."
					required
				/>
				<hr />

				<Textarea
					name="Textarea"
					label="Textarea"
					placeholder="Write long-text here."
					hint="This is help text."
				/>

				<Numberfield
					id="number"
					placeholder={2}
					label="This is a number input"
					hint="this is a hint"
				/>

			</form>

		</Layout>
	)
}
