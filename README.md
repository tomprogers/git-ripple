# git ripple

A tool that generates `git rebase` commands from a regularized description of a
branch hierarchy.


## Usage

```
$ git-ripple BRANCH_INFO
```

Where `BRANCH_INFO` is a multi-line string that describes a branch hierarchy,
like so:

```
root-branch-name
> child-branch-name @ child-base-commit
>> grandchild-branch-name @ grandchild-base-commit
```

`git-ripple` supports arbitrarily large and complex collections of branches, so
long as they are described using the syntax demonstrated above:

- each line contains the name of a branch
- each line begins with a set of `>` or TABs that indicate branch hierarchy
- each branch that should be rebased ends with `@ + base-commit`
- comments are ignored, marked with `#` or `//`

`git-ripple` does not perform any actions, it merely emits a set of commands that
the user might optionally execute.


## Package scripts

|| Scripts ||
