# discord-js-bot-template

Made this mostly for my own purposes, but anybody is welcome to use it. 
It was originally copied from the [simple-discord-js-bot](https://github.com/bredmor/simple-discord-js-bot) by [bredmor](https://github.com/bredmor), but I found that the original code was a little outdated and I wanted to add some debugging and other functionality on top of that, so I spun this off into a new repo. 

## Set Up
1. At the top of the GitHub Repo, click the green "Use this template" button > "Create a new repository" 
2. In your VS Code go to Terminal > New Terminal (or whatever the equivalent is in your IDE) and run the following: 
  - `npm init -y`
  - `npm install express`
  - `npm install discord.js dotenv`
3. In the [Discord Developer Portal](https://discord.com/developers/home) go to Applications > your_bot (or New Application) > Overview > Bot > Reset Token > Copy 
4. In your project's `config.json`, paste the token into the `token` field
5. Invite the bot to your discord server using the invite code generated in Applications > your_bot (or New Application) > Overview > OAuth2 
6. Run the bot with `node index.js` 
