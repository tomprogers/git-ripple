module.exports = function createRebaseCmd( branchInfo ) {
	if(!branchInfo) throw new TypeError('branch is falsy')

	let { parentBranch, baseCommit, branchName } = branchInfo

	if(!parentBranch) throw new TypeError('branch has no parentBranch')
	if(!baseCommit) throw new TypeError('branch has no baseCommit')
	if(!branchName) throw new TypeError('branch has no branchName')

	return `git rebase --onto ${parentBranch} ${baseCommit} ${branchName}`
}
