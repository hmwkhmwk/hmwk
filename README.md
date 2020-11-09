# hmwk

As part of the monday.com Apps Marketplace challenge, we've created "hmwk", an app that lets your child scan their homework and "turn it in" to their teacher, right from their phone! Because hmwk integrates with monday.com, teachers can use the monday.com platform to receive homeworks in a central location and keep track of each student's development and learning.

![hmwk logo](./public/hmwk_logo_v1.png)

## Dev guide

### Install NodeJS from scratch on Mac OS X

This step is optional.

```bash
set -euxo pipefail

# Update Brew
# * I had to specify --debug --verbose since it's otherwise silent and looked
#   like it was hanging.
brew update --debug --verbose

# Clean slate
brew uninstall --ignore-dependencies node
brew uninstall --force node
brew uninstall --ignore-dependencies nvm  # If you have nvm
brew uninstall --force nvm                # If you have nvm
cd $HOME && rm -rf .nvm .npm .node-gyp .node_repl_history

# Install nvm
# * https://medium.com/@jamesauble/install-nvm-on-mac-with-brew-adb921fb92cc
# * https://github.com/nvm-sh/nvm
brew install nvm
# follow instructions, restart terminal, then run this. If it prints 'nvm', success!
command -v nvm

# Install the currently latest LTS version of node (currently it is 14.15.0)
nvm install 14.15.0
nvm use 14.15.0
```
