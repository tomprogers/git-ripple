const create = require('./create-rebase-cmd')


describe(`createRebaseCommand( branchInfo )`, () => {

	it(`returns the command as a string`, () => {
		expect(create({ branchName: 'feature', parentBranch: 'parent', baseCommit: 'base' }))
		.toBe(`git rebase --onto parent base feature`)
	})

	it(`throws an error if crucial data is missing`, () => {
		expect(
			() => create({ parentBranch: 'parent', baseCommit: 'base' })
		).toThrow(TypeError)

		expect(
			() => create({ branchName: 'feature', baseCommit: 'base' })
		).toThrow(TypeError)

		expect(
			() => create({ branchName: 'feature', parentBranch: 'parent' })
		).toThrow(TypeError)
	})

})
