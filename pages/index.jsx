import { Header } from '../components'
import { SimpleDebug } from '../utils'
import React from 'react'


export default function DashboardPage({ allContentTypes }) {

	//- ------------------------------------
	// Just testing ideas for creating the menu/links

	// Get an array of unique groups
	const _groupsList = []
	function _getGroupsList() {
		allContentTypes.map(i => {
			if (i.group && !_groupsList.includes(i.group)) {
				return _groupsList.push(i.group)
			}
		})
	}
	_getGroupsList()

	// Get an array of content-types that aren't in groups
	const _typesList = []
	function _getTypesList() {
		allContentTypes.map(i => {
			if (!i.group && !_typesList.includes(i.label)) {
				return _typesList.push(i.label)
			}
		})
	}
	_getTypesList()

	// Combine arrays to get the full menu display
	const _menuItems = _groupsList.concat(_typesList)

	// Get an array of content types organized  by their groups
	const _groupTypes = []
	function _getGroupTypes() {
		_groupsList.map(group => {
			const _groupChildren = []
			allContentTypes.map(type => {
				if (group === type.group) {
					return _groupChildren.push(type.label)
				}
			})
			return _groupTypes.push(group, _groupChildren)
		})
	}
	_getGroupTypes()

	// console.log(content)
	// const mapData = content.map(x => x.label)
	// console.log(mapData)

	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<SimpleDebug label="Unique Groups">{_groupsList}</SimpleDebug>
			<SimpleDebug label="Content Types (not in a group)">{_typesList}</SimpleDebug>
			<SimpleDebug label="Menu Items">{_menuItems}</SimpleDebug>
			<SimpleDebug label="Content Types (in their group)">{_groupTypes}</SimpleDebug>

			{/* <SimpleDebug label="content">{allContentTypes}</SimpleDebug> */}

		</>
	)
}


{/* <pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre> */}
