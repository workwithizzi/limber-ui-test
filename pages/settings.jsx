import { Layout, Form, Select, Checkbox, Toggle, Textfield, Radio, Textarea, Numberfield, Button } from '../components'


const _testOptions=[{
	value: `dog`,
	label: `Dog`,
},{
	value: `cat`,
	label: `Cat`,
},{
	value: `hamster`,
	label: `Hamster`,
}]

export default function SettingsPage() {
	return (
		<Layout
			title="Settings"
			subtitle="Settings here affect the entire site."
		>

			<Form title="Testing Settings">

				<Select
					name="selectTest"
					label="This is a select Input"
					hint="this is a hint"
					options={_testOptions}
				/>

				<Button>Child Text</Button>
				<Button label="Default" />
				<Button label="Active" active />
				<Button label="Primary" primary />
				<Button label="Default Block" block />
				<Button label="Primary Block" primary block />
				<Button label="Disabled" disabled/>
				<Button label="Primary Disabled" primary disabled/>
				<Button label="Caution" caution />

				<br />
				<br />

				<hr />
				<Toggle
					id="toggle2"
					label="Toggle 2 with hint"
					hint="this is a hint"
				/>

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

			</Form>

		</Layout>
	)
}
