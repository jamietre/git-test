## git-test

Simple CLI utility to test git output and return exit 1 if a test fails

### Installation

    npm install -g git-test-cli

### Usage

    [master] > git-test -b master && echo on master
    on master
    [master] > git checkout feature
    [feature] > git-test -b master && echo on master
    [feature] >

The intended use is as a scripting helper, e.g. to perform certain actions during automated processes (such as builds) based on the current git branch.

Right now it only can test branch, but adding other tests would be trivial.

### Options

##### --branch [branch-name]

Test that the current git repo is on [branch-name]

##### --help

Show help

##### --status

Just output the status info I obtained from git as JSON

### Roadmap

- Add some unit tests



