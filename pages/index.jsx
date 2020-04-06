import { Header } from '../components'
import { parseYaml, getRepo } from '../utils'

import React, { useState, useEffect } from 'react'

// Demo Arrays
const array1 = {
	name: `fileOne`,
	path: `content/one`,
}
const array2 = {
	path: `content/two`,
	name: `fileTwo`,
}


// TODO: Need to replace this with the 'config_dir from settings
const replaceThisConst = `limber/`

export default function DashboardPage({ allFiles }) {

	const [content, setContent] = useState([])

	// if you want to set a value to a state, you have to do it in the useEffect, as otherwise, there will be an infinite loop of requests on each state change
	useEffect(() => {
		// TODO: The array is printing to the console, but I'm not able to pull an individual key/value from it.
		console.log(`7: data array length = ${data.length}`)

		// this is executed only when there's a FULLFILLED RESULT from the async function _parseContentTypes
		getData()
			.finally(() => {
				const mapData = data.map(x => x.name)
				console.log(mapData)
				setContent(mapData)
			})
	}, [])

	console.log(`1: Init the data array`)
	const data = []
	console.log(`2: data array length = ${data.length}`)

	console.log(`3: outside of async function _parseContentTypes`)
	async function _parseContentTypes(fileName) {
		const rawData = await getRepo(`${replaceThisConst}${fileName}`)

		// as far as we are AWAITING the rawData, we need to RESOLVE a promise off of it
		return new Promise(resolve => {
			// inside of a promise we can perform ASYNC operations
			// as far as rawData is a Promise we should handle data.push(parseYaml(rawData)) accordingly


			// Get the data from a content-type's file
			// Decode data to yaml, and add to 'data' array
			console.log(`4: inside of async function _parseContentTypes`)
			resolve(data.push(parseYaml(rawData)))
		})
	}

	console.log(`5: before allFiles.map`)
	// For each file in config directory

	// here we have an async function that resolves the promises from the allFiles.map() and returns data if ALL promises returned data
	const getData = async() => {
		return Promise.all(
			allFiles.map(async file => {
				await _parseContentTypes(file.name)
			})
		)}

	console.log(`6: after allFiles.map`)

	
	// Test Stuff
	// const arrayData = []
	// arrayData.push(array1)
	// arrayData.push(array2)
	// console.log(arrayData)
	// const mapArrayData = arrayData.map(x => x.name)
	// console.log(mapArrayData)

	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre>
			{data.map(type => {
				return (
					<p key={type.label}>{type.label}</p>
				)
			})}
			{
				<pre>{JSON.stringify(content)}</pre>
			}
		</>
	)
}


// GET "list of files in limber config directory"
DashboardPage.getInitialProps = async() => {
	// Create an array using each config file's name
	const allFiles = await getRepo(replaceThisConst)
	return { allFiles }
}
