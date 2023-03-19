const parse = require('./parse-branch-tree-string')

const SINGLETON_LINEAGE = `
main
> child-1 @ base-commit-0
>> child-2 @ base-commit-1
`

const FORKED_LINEAGE = `
main
> child-1 @ base-commit-0
>> child-2 @ base-commit-1
> child-3 @ base-commit-2
>> child-4 @ base-commit-3
`

const SINGLETON_LINEAGE_TABS = `
main
	child-1 @ base-commit-0
		child-2 @ base-commit-1
`


describe(`parseBranchTreeString( branchTreeString )`, () => {

	it(`parses a lineage of singletons`, () => {
		expect(parse(SINGLETON_LINEAGE)).toEqual([
			{ branchName: 'main', baseCommit: null, parentBranch: null },
			{ branchName: 'child-1', baseCommit: 'base-commit-0', parentBranch: 'main' },
			{ branchName: 'child-2', baseCommit: 'base-commit-1', parentBranch: 'child-1' }
		])
	})

	it(`can handle a lineage that splits`, () => {
		expect(parse(FORKED_LINEAGE)).toEqual([
			{ branchName: 'main', baseCommit: null, parentBranch: null },
			{ branchName: 'child-1', baseCommit: 'base-commit-0', parentBranch: 'main' },
			{ branchName: 'child-2', baseCommit: 'base-commit-1', parentBranch: 'child-1' },
			{ branchName: 'child-3', baseCommit: 'base-commit-2', parentBranch: 'main' },
			{ branchName: 'child-4', baseCommit: 'base-commit-3', parentBranch: 'child-3' }
		])
	})

	it(`understands tabs and brackets for indentation`, () => {
		expect(parse(SINGLETON_LINEAGE_TABS)).toEqual([
			{ branchName: 'main', baseCommit: null, parentBranch: null },
			{ branchName: 'child-1', baseCommit: 'base-commit-0', parentBranch: 'main' },
			{ branchName: 'child-2', baseCommit: 'base-commit-1', parentBranch: 'child-1' }
		])
	})

	it(`returns an empty array if no branches can be recovered from branchTreeString`, () => {
		expect(parse('')).toEqual([])
	})

	it(`throws if branchTreeString is not a string`, () => {
		expect(
			() => parse(5)
		).toThrow(TypeError)
	})

})
