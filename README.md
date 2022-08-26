# Neobot: A typescript based Discord bot

An open-source multi-purpose bot for discord. I did this as an warm-up project for getting started with dashboards. You can use this as an free alternative to other bots!

## Features

- Proper command and event handler
- Zero to no bugs
- Vast room for customization
- Free and open-source

## Installation

Follow the instructions below to initialize your bot.

### Requirements

1. NodeJS v16 or above
1. Basic understanding of Typescript

### Getting the bot online

Install neobot with npm

```bash
  npm install
  git clone https://github.com/GoodBoyNeon/neobot.git
  cd neobot
```

Now, you can rename the `.env.example` file to `.env` and fill out the values

```env
TOKEN= # your-bot-token
CLIENT_ID= # bot's user ID
TEST_GUILD_ID= # server ID of the dev server
ENVIRONMENT= # which environment are you on? (dev, prod or debug)
```

Afterwards, you can choose one of these 4 scripts to run your bot

```py
  npm run start # Start the bot via typescript code
  npm run dev # Start the bot via typescript code using nodemon
  npm run build # Compile the typescript code to javascript (this won't run the bot)
  npm run prod # Run the bot through js code (You need to run `npm run build` before this)
```

That's it! You shall have your bot online!

## Authors

- [@GoodBoyNeon](https://www.github.com/GoodBoyNeon)
