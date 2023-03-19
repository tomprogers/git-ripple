const parse = require('./parse-branch-line')


describe(`parseBranchLine( branchString )`, () => {

	it(`recognizes tier`, () => {
		expect(parse( 'main'                    )).toHaveProperty( 'tier', 0 )
		expect(parse( '> child @ c0960fc'       )).toHaveProperty( 'tier', 1 )
		expect(parse( '>> grandchild @ fa471c4' )).toHaveProperty( 'tier', 2 )
	})

	it(`recognizes branch name`, () => {
		expect(parse( 'main'                    )).toHaveProperty( 'branchName', 'main'       )
		expect(parse( '> child @ c0960fc'       )).toHaveProperty( 'branchName', 'child'      )
		expect(parse( '>> grandchild @ fa471c4' )).toHaveProperty( 'branchName', 'grandchild' )
	})

	it(`recognizes base commit`, () => {
		expect(parse( '> child @ c0960fc'       )).toHaveProperty( 'baseCommit', 'c0960fc' )
		expect(parse( '>> grandchild @ fa471c4' )).toHaveProperty( 'baseCommit', 'fa471c4' )
	})

	it(`accepts tabs or angle-brackets as depth specifiers`, () => {
		expect(parse( '\tchild @ c0960fc'        )).toHaveProperty( 'tier', 1 )
		expect(parse( '\t\tgrandchild @ fa471c4' )).toHaveProperty( 'tier', 2 )
	})

	it(`understands root branches`, () => {
		expect(parse( 'main' )).toHaveProperty( 'baseCommit', null )
	})

	it(`ignores content that appears after # or //`, () => {
		expect(parse('> branch @ c0960fc # comment')).toEqual({
			tier: 1,
			branchName: 'branch',
			baseCommit: 'c0960fc'
		})
	})

	it(`throws if branchString is not a string`, () => {
		expect(
			() => parse(5)
		).toThrow(TypeError)
	})

})
