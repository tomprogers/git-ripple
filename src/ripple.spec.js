const ripple = require('./ripple')


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

describe(`ripple( branchTreeString )`, () => {

	it(`generates correct rebase commands`, () => {
		expect(ripple(SINGLETON_LINEAGE)).toEqual([
			'git rebase --onto main base-commit-0 child-1',
			'git rebase --onto child-1 base-commit-1 child-2'
		])

		expect(ripple(FORKED_LINEAGE)).toEqual([
			'git rebase --onto main base-commit-0 child-1',
			'git rebase --onto child-1 base-commit-1 child-2',
			'git rebase --onto main base-commit-2 child-3',
			'git rebase --onto child-3 base-commit-3 child-4'
		])
	})

})
