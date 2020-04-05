import { Header, Form, Select, Checkbox, Toggle, Textfield, Radio, Textarea, Numberfield, Button } from '../components'


// Temp data for testing
// TODO: Change this to get `settings` from API
import settings from '../db/limber.yaml'


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
		<>
			<Header
				title="Settings"
				subtitle="Settings here affect the entire site."
			/>

			<Form title="Testing Settings">

				<Textfield
					name="site_url"
					label="Site URL"
					// placeholder="Write text here."
					value={settings.site_url}
					hint="Add the URL for your production site."
					required
				/>

				<Textfield
					name="site_title"
					label="Site Title"
					// placeholder="Write text here."
					value={settings.site_title}
					hint="The site title is used for things like metadata and for display purposes throughout the CMS."
				/>

				<Textfield
					name="logo_path"
					label="Logo"
					// placeholder="Write text here."
					defaultValue={settings.logo_path}
					hint="Enter the path or URL to your site's logo."
				/>

				<Textfield
					name="favicon_path"
					label="Favicon"
					// placeholder="Write text here."
					defaultValue={settings.favicon_path}
					hint="Enter the path or URL to your site's favicon."
				/>

				<br />
				<hr />
				<hr />
				<br />
				<h3>The rest of these are just examples of inputs</h3>

				<Select
					name="selectArray"
					label="This is a select Input from an array of options."
					hint="This is a hint"
					options={_testOptions}
				/>

				<Select
					name="selectChildren"
					label="This is a select Input from children options."
					hint="This is a hint"
				>
					<option value="">--Ice Cream--</option>
					<option value="chocolate">Chocolate</option>
					<option value="vanilla">Vanilla</option>
					<option value="strawberry">Strawberry</option>
				</Select>

				<Toggle
					id="toggleHint"
					label="Toggle with a hint"
					hint="This is a hint"
				/>

				<Toggle
					id="toggle"
					label="Toggle without a hint"
				/>

				<Checkbox
					id="checkHint"
					label="Checkbox 1"
					value="checkHint"
					hint="This is a hint."
				/>
				<Checkbox
					id="check"
					label="Checkbox 2"
					value="check"
				/>

				<Radio
					name="options"
					label="Radio 1"
					id="option1"
					value="Radio 1"
					hint="This one has a hint"
				/>

				<Radio
					name="options"
					label="Radio 2"
					id="option2"
					value="Radio 2"
				/>

				<Textfield
					name="textfield"
					label="This is a Text field"
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

				<Textarea
					name="textarea"
					label="Textarea"
					placeholder="Write long-text here."
					hint="This is help text."
				/>

				<Numberfield
					id="number"
					placeholder={2}
					label="This is a number input"
					hint="This is a hint"
				/>

				<hr />
				<h3>Here are some buttons</h3>

				<Button style={{"marginRight":`10px`}}>Default</Button>
				<Button style={{"marginRight":`10px`}} label="Active" active />
				<Button style={{"marginRight":`10px`}} label="Disabled" disabled/>
				<Button style={{"margin":`10px 0`}} label="Block" block />

				<Button style={{"marginRight":`10px`}} label="Primary" primary />
				<Button style={{"marginRight":`10px`}} label="Active" active primary />
				<Button style={{"marginRight":`10px`}} label="Disabled" primary disabled/>
				<Button style={{"margin":`10px 0`}} label="Block" primary block />

				<Button style={{"marginRight":`10px`}} label="Caution" caution />
				<Button style={{"marginRight":`10px`}} label="Active" active caution />
				<Button style={{"marginRight":`10px`}} label="Disabled" disabled caution />
				<Button style={{"margin":`10px 0`}} label="Block" block caution />

			</Form>
		</>
	)
}
