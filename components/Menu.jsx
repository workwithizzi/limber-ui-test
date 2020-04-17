// Main menu in the app.
// The dynamic menu-items are created based on Groups/Labels from
// the CT config files

import Link from "next/link"
import { getCT } from '../utils'

export function Menu({repoSettings, allContentTypes}) {
	// These are for the key value when looping through items
	let groupKey = 1
	let typesKey = 1

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
						{getCT.groupNames(allContentTypes).map(i => {
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
						})}

						{/* From "solo" content-types array --CT's that aren't in a Group */}
						{getCT.soloTypesNames(allContentTypes).map(i => {
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
						})}

					</ul>
				</div>
			</div>
		</>
	)
}
