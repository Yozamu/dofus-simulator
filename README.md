This application has been developed to support theorycrafting in [Dofus](https://www.dofus.com/fr), but is just a hobby project.

## Why does it exist ?

At the start, there was no particular reason for this to exist. There are alternatives, [Dofusbook](https://www.dofusbook.net/fr/) being the most popular one. This application's first version only included character stuff, which is similar to what already exists; but as I worked towards new versions, I implemented features I haven't seen yet, and that could be useful to some people, hence why I decided to share the project.

## Features

- Select a character among the 19 available classes, and set your characteristics
- Choose among items from the database to stuff your character
- Check detailed stats computed from your characteristics and stuff
- Browse items and filter them based on various criteria
- 🔥 Simulate fights (one-sided) to test your damage output each turn (with real AP usage and buffs)
- 🔥 Choose an enemy from the game to see how an actual battle would go damage-wise
- 🔥 Use the maging tool to track remainder on your item as you work

## What's left to do

- Translate the application (currently French only)
- Add spells for all classes (only Pandawa has been partially added for now)
- Update Volkorne names & stats
- Add monster spells to simulate two-sided battles
- Update sets IDs

## Limitations

There are two main limitations to this project

- I do not have an unlimited amount of time (nor of will) to work on the project on a daily basis
- Data sources are sparse and I've had to retrieve everything from different sources, which involves a lot of boring work, which may not stay up to date with time.

## Run the project

You can directly use the [online version](https://dofus-simulator.vercel.app/stuff).
If you'd rather run it locally you can clone the repository and, as usual, run the webapp locally with

```bash
yarn dev
```

If it doesn't launch automatically, [open it manually in your browser](http://localhost:3000).
