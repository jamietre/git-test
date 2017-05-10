## git-test

Simple CLI utility to test git output and return exit 1 if a test fails

### Installation

    npm install -g git-test-cli

### Usage

    [master] > git-test -b master && echo on master || echo not on master
    on master
    
    [master] > git checkout feature
    [feature] > git-test -b master && echo on master || echo not on master
    not on master


The intended use is as a scripting helper, e.g. to perform certain actions during automated processes (such as builds) based on the current git branch. For example, using [husky](https://github.com/typicode/husky), the following will run tests before pushing code to master:

```javascript
{
   "scripts": {
       "prepush": "git-test -b master && npm test || git-test -nb master"
   } 
}
```

The negative test following the || is needed to ensure the logic following the initial test is atomic. That is, every logical test that starts with the assertion "if I'm on this branch" should end with an "or" condition of "if I'm not on this branch".

Right now it's only feature is to test which branch is active. If I need more... I will add it.

### Options

##### --branch [branch-name]
##### -b [branch-name]

Test that the current git repo is on [branch-name]

##### --not-branch [branch-name]
##### -nb [branch-name]

Test that the current git repo is **not** on [branch-name]

##### --help

Show help

##### --status

Just output the status info I obtained from git as JSON (for diagnostics)





