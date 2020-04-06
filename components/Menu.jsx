import Link from "next/link"


export function Menu({settings}) {
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

						{/* Temp Page */}
						<li className="pure-menu-item">
							<Link href="/tv">
								<a className="pure-menu-link">Batman</a>
							</Link>
						</li>

						{/* Menu Items from groups array */}
						{settings.groups.map(group => {
							let liClass=`pure-menu-item`
							if (item === 1) {
								liClass=`pure-menu-item menu-item-divided`
							}
							item++
							return (
								<li className={liClass} key={group.label}>
									{/* <Link href="/groups/[id]" as={`/groups/${group.path}`}>
										<a className="pure-menu-link">{group.label}</a>
									</Link> */}
									<Link href={`/group?group=${group.label}`}>
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
