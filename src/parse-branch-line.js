module.exports = function parseBranchLine( branchString ) {
	if(typeof branchString !== 'string') throw new TypeError('branchString is not a string')


	// STEP 0: sanitize input

	// remove any comments (and any spaces that immediately precede the comment marker)
	branchString = branchString.replace(/ *(#|\/\/).*?$/gi, '')

	if(!branchString.length) return undefined


	// STEP 1: identify and remove the branch tier
	let tier = 0

	// check for a tier signifier at the beginning of the line
	let tierMatch = branchString.match(/^(>+ +|\t+)/)

	if(tierMatch) {
		let tierString = tierMatch[1]

		// calculate tier from tierString: remove trailing space then count length
		tier = tierString.replace(/ $/, '').length

		// remove the tierString from the string we'll parse later
		branchString = branchString.replace(tierString, '')
	}

	// identify the parts
	let branchName
	let baseCommit

	/*
		1 'branchName'
		3 'branchName' '@' 'baseCommit'
	*/
	let parts = branchString.split(' ')
	switch(parts.length) {
		// should be impossible
		case 0:
		case 2:
			return undefined

		case 1:
			branchName = parts[0]
			baseCommit = null
			break

		case 3:
			branchName = parts[0]
			baseCommit = parts[2]
			break

		default: throw new SyntaxError('could not parse branchString')
	}

	return {
		tier,
		branchName,
		baseCommit
	}
}
