const parseBranchLine = require('./parse-branch-line')


module.exports = function parseBranchTreeString( branchTreeString ) {
	if(typeof branchTreeString !== 'string') throw new TypeError('branchTreeString is not a string')

	let lines = branchTreeString.split('\n').filter(line => line.length)
	if(!lines.length) return []

	let branchSet = []
	for(let line of lines) {
		// console.log(`line`, JSON.stringify(line))

		let branch = parseBranchLine(line)
		// console.log(`branch`, JSON.stringify(branch))

		if(!branch) continue

		/*
			parent/child logic: convert .tier to .parentBranch by comparing current
			tier to previous to identify parent

			if tier is 0, no parent
			otherwise, search previous rows for a branch with tier -1
		*/
		branch.parentBranch = null
		if(branch.tier > 0) {
			let parent = branchSet.slice().reverse().find(previous => previous.tier === branch.tier - 1)
			if(!parent) throw new SyntaxError('branch has no parent')

			branch.parentBranch = parent.branchName
		}

		branchSet.push(branch)
	}

	return branchSet.map(({ branchName, baseCommit, parentBranch }) => ({ branchName, baseCommit, parentBranch }))
}
