import Link from "next/link"
import { getCT } from '../utils'


export function Menu({repoSettings, allContentTypes}) {
	let groupKey = 1
	let typesKey = 1

	return (
		<>
			{/* Menu toggle */}
			<a href="#menu" id="menuLink" className="menu-link">
				{/* Hamburger icon */}
				<span></span>
			</a>

			<div id="menu">
				<div className="pure-menu">
					{/* Logo */}
					<Link href="/">
						<a className="pure-menu-heading">Limber</a>
					</Link>

					<ul className="pure-menu-list">
						{/* Static Menu Items */}
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

						{/* Menu Items from groups array */}
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

						{/* Menu Items from solo content-types array */}
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
