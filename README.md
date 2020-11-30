# hmwk

<p align="center">
  <img src="./public/hmwk_mark.png" />
</p>

As part of the monday.com Apps Marketplace challenge, we've created "hmwk", an app that lets your child scan their homework and "turn it in" to their teacher, right from their phone! Because hmwk integrates with monday.com, teachers can use the monday.com platform to receive homeworks in a central location and keep track of each student's development and learning.

## Install

Add hmwk to monday.com!

<a href="https://auth.monday.com/oauth2/authorize?client_id=2b8295571169c8715ed9ad765153a96f&response_type=install"> <img alt="Add to monday.com" height="42" src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/Tal/4b5d9548-0598-436e-a5b6-9bc5f29ee1d9_Group12441.png" /> </a>

TODO: Add video onboarding link here.

Once setup, your students will be emailed a personalized link to https://hmwkhmwk.herokuapp.com to submit and view their homework.

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

### Other dependencies

```bash
# Sorry, you need Mac OS X ><
# This step should be solved via Heroku buildpack on Heroku.
brew install imagemagick
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

### Build the app and run it locally with Heroku command

You will need to install [`Heroku CLI`](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) first

```
npm install
heroku local web
```

The app will now be redirected to http://localhost:5000/
