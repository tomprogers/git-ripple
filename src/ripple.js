const parseBranchTreeString = require('./parse-branch-tree-string')
const createRebaseCmd = require('./create-rebase-cmd')


module.exports = function ripple( branchTreeString ) {

	let branchSet = parseBranchTreeString(branchTreeString)

	let commands = []
	for(branch of branchSet) {
		if(!branch.parentBranch) continue
		commands.push(createRebaseCmd(branch))
	}

	return commands
}
