import Link from "next/link"

// Temp data for testing
import data from "../db/limber.json"


export function Menu() {
	let item=1
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
						{data.groups.map(group => {
							let liClass=`pure-menu-item`
							if (item === 1) {
								liClass=`pure-menu-item menu-item-divided`
							}
							item++
							return (
								<li className={liClass} key={group.path}>
									{/* <Link href="/groups/[id]" as={`/groups/${group.path}`}>
										<a className="pure-menu-link">{group.label}</a>
									</Link> */}
									<Link href={`/group?group=${group.path}`}>
										<a className="pure-menu-link">{group.label}</a>
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
