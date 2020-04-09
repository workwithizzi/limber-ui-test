import Link from "next/link"


export function Menu({repoSettings, allContentTypes}) {
	let groupKey = 1
	let typesKey = 1

	// Create an array of unique groups
	const _groupsList = []
	function _createGroupsList() {
		allContentTypes.map(i => {
			if (i.group && !_groupsList.includes(i.group)) {
				return _groupsList.push(i.group)
			}
		})
	}
	_createGroupsList()

	// Create an array of content-types that aren't in groups
	const _soloTypesList = []
	function _createSoloTypesList() {
		allContentTypes.map(i => {
			if (!i.group && !_soloTypesList.includes(i.label)) {
				return _soloTypesList.push(i.label)
			}
		})
	}
	_createSoloTypesList()


	// const mapData = allContentTypes.map(x => x.name)
	// console.log(mapData)
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
						{_groupsList.map(i => {
							let liClass=`pure-menu-item`
							if (groupKey === 1) {
								liClass=`pure-menu-item menu-item-divided`
							}
							groupKey++
							return (
								<li className={liClass} key={i}>
									<Link href={`/articles?group=${i}`}>
										<a className="pure-menu-link">{i}</a>
									</Link>
								</li>
							)
						})}

						{/* Menu Items from solo content-types array */}
						{_soloTypesList.map(i => {
							let liClass=`pure-menu-item`
							if (typesKey === 1) {
								liClass=`pure-menu-item menu-item-divided`
							}
							typesKey++
							return (
								<li className={liClass} key={i}>
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
