// Main menu in the app.
// The dynamic menu-items are created based on Groups/Labels from
// the CT config files

import Link from "next/link"
import { getCT, ContentTypes as CT } from '../utils'

export function Menu({ allContentTypes }) {
	// These are for the key value when looping through items
	let groupKey = 1
	let typesKey = 1

	// Define a Class Object with the passed in data
	const ContentTypes = new CT(allContentTypes)

	function _renderFromGroups() {
		// Use a class ContentTypes to return an array of non-duplicated group names
		return ContentTypes.getGroupNames().map(i => {
			let liClass=`pure-menu-item`
			if (groupKey === 1) {
				liClass=`pure-menu-item menu-item-divided`
			}
			groupKey++
			return (
				<li className={liClass} key={groupKey}>
					<Link href={`/articles?group=${i}`}>
						<a className="pure-menu-link">{i}</a>
					</Link>
				</li>
			)
		})
	}

	function _renderFromSoloTypes() {
		return ContentTypes.getSoloTypesNames().map(i => {
			let liClass=`pure-menu-item`
			if (typesKey === 1) {
				liClass=`pure-menu-item menu-item-divided`
			}
			typesKey++
			return (
				<li className={liClass} key={typesKey}>
					<Link href={`/articles?type=${i}`}>
						<a className="pure-menu-link">{i}</a>
					</Link>
				</li>
			)
		})
	}

	return (
		<>
			{/* Mobile Menu toggle Button */}
			<a href="#menu" id="menuLink" className="menu-link">
				{/* Hamburger icon */}
				<span></span>
			</a>

			<div id="menu">
				<div className="pure-menu">
					{/* --- Static Menu Items --- */}
					{/* Logo */}
					<Link href="/">
						<a className="pure-menu-heading">Limber</a>
					</Link>

					<ul className="pure-menu-list">
						<li className="pure-menu-item">
							<Link href="/">
								<a className="pure-menu-link">Dashboard</a>
							</Link>
						</li>
						<li className="pure-menu-item">
							<Link href="/settings">
								<a className="pure-menu-link">Settings</a>
							</Link>
						</li>

						{/* --- Dynamic Menu Items --- */}

						{/* From groups array */}
						{/* {getCT.groupNames(allContentTypes).map(i => {
							let liClass=`pure-menu-item`
							if (groupKey === 1) {
								liClass=`pure-menu-item menu-item-divided`
							}
							groupKey++
							return (
								<li className={liClass} key={groupKey}>
									<Link href={`/articles?group=${i}`}>
										<a className="pure-menu-link">{i}</a>
									</Link>
								</li>
							)
						})} */}

						{/* Converted above into a function */}
						{_renderFromGroups()}

						{/* From "solo" content-types array --CT's that aren't in a Group */}
						{/* {getCT.soloTypesNames(allContentTypes).map(i => {
							let liClass=`pure-menu-item`
							if (typesKey === 1) {
								liClass=`pure-menu-item menu-item-divided`
							}
							typesKey++
							return (
								<li className={liClass} key={typesKey}>
									<Link href={`/articles?type=${i}`}>
										<a className="pure-menu-link">{i}</a>
									</Link>
								</li>
							)
						})} */}

						{/* Converted above into a function */}
						{_renderFromSoloTypes()}
					</ul>
				</div>
			</div>
		</>
	)
}
