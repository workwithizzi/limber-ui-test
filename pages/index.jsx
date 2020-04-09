import { Header } from '../components'
import { getRepoData, SimpleDebug } from '../utils'
import React, { useState, useEffect } from 'react'

// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = `/limber`


export default function DashboardPage({ content }) {

	/**
	 * MOVED to the `_app.jsx`
	 */

	// const [content, setContent] = useState([])
	// const _tempArray = []

	// useEffect(() => {
	// 	_combineContentTypesData()
	// }, [])

	// async function _combineContentTypesData() {
	// 	return Promise.all(
	// 		// Loop through list of files in config directory
	// 		contentTypes.map(async file => {
	// 			// GET the encoded data for each file
	// 			const _encodedData = await getRepoData(`${replaceThisConst}/${file.name}`, `parse`)
	// 			return new Promise(resolve => {
	// 				// Decode data + add data to the array
	// 				resolve(_tempArray.push(_encodedData))
	// 			})
	// 		})
	// 	).finally(() => {
	// 		setContent(_tempArray)
	// 	})
	// }


	//- ------------------------------------
	// Just testing ideas for creating the menu/links

	// Get an array of unique groups
	const _groupsList = []
	function _getGroupsList() {
		content.map(i => {
			if (i.group && !_groupsList.includes(i.group)) {
				return _groupsList.push(i.group)
			}
		})
	}
	_getGroupsList()

	// Get an array of content-types that aren't in groups
	const _typesList = []
	function _getTypesList() {
		content.map(i => {
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
			content.map(type => {
				if (group === type.group) {
					return _groupChildren.push(type.label)
				}
			})
			return _groupTypes.push(group, _groupChildren)
		})
	}
	_getGroupTypes()


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

			{/* <SimpleDebug label="content">{content}</SimpleDebug> */}

		</>
	)
}


{/* <pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre> */}
