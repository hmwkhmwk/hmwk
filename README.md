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

In the project root directory (`hmwk/`), the `.nvmrc` file is set to `14.15.0`, so you can also just run `nvm use` to switch to that version. Note that you don't have to do this every single time.

### Personal workspace playground

When developing, it is useful to have your own playground workspace.

1. In one tab, run `npm run expose`. In another tab, run `npm run server-dev`. Copy the `https://` ngrok URL. You will need this for step 2.

2. Create a "Reset Boards (`YOU`)" recipe. For the subscription URL, put in your ngrok url suffixed with `/reseed/subscribe`, e.g. `https://7cc0c3259e14.ngrok.io/reseed/subscribe`. Do the same for `/reseed/unsubscribe`.

3. Create your own workspace, e.g. named "`<YOU>` Playground".

4. Click "Add" --> "New from template" --> "See More Templates".

5. Search for and use "hmwk for teachers".

6. Click "Integrate" --> "+ Add new integration".

7. Search for and use "Reset Boards (`<YOU>`)". Fill out the recipe sentence completely.

That's it! Now if you want to reseed your boards, just run:

```bash
npm run reseed
```

Note: Don't reseed too often in a short amount of time. [monday.com rate limits you](https://monday.com/developers/v2#rate-limits-section).
