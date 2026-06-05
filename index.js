require('events').defaultMaxListeners = 50;

const fs = require('fs'); 
const Discord = require('discord.js'); 
const Config = require('./config.json'); 
const BotLib = require('./lib/bot.js'); 
const DebugLib = require('./lib/debug.js'); 
const Keywords = require('./dispatchers/keywordDispatch');
const Commands = require('./dispatchers/commandDispatch'); 

// Declare necessary gateway intents
const client = new Discord.Client({
    ws: {
        intents: [
            'GUILDS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
            'DIRECT_MESSAGES'
        ]
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.botConfig = Config; 
client.botConfig.rootDir = __dirname; 

BotLib.loadHandlers(client, 'commands');
BotLib.loadHandlers(client, 'keywords');

const cooldowns = new Discord.Collection(); 

if(client.botConfig.debug) 
{
    console.log('Config Loaded: ', client.botConfig);
}

// Functions 
async function SendDM(client, userId, messageContent)
{
	try 
	{
		const user = await client.users.fetch(userId); // Get the user by ID
		await user.send(messageContent); // Send them a DM
		console.log(`DM sent to ${user.tag}`);
	} 
	catch (error) 
	{
		console.error("Failed to send DM:", error);
	}
}

// Starts the bot and sets its activity 
client.on('ready', () => 
{
    console.log('Bot Online');

	// client.user.setActivity(
	// {
	// 	name: 'the_thing_the_bot_is_doing',
	// 	type: 0
	// });
});

// Handle user messages
client.on('message', message => 
{
    // Check for keywords that don't use a real command structure
    if(Keywords.handle(client, message)) 
	{
        return; 
    }

    // Check for structured commands
    if(Commands.handle(client, message, cooldowns)) 
	{
        return; 
    }

    // Register debug message printer
    DebugLib.debugPrintMessages(client, message);
});

// Handle users reacting 
client.on('messageReactionAdd', async (reaction, user) => 
{
	
});

// Log the bot in using the token provided in the config file
client.login(client.botConfig.token).catch((err) => 
{
    console.log(`Failed to authenticate with Discord network.`, err);
});

process.on('unhandledRejection', (reason, promise) => 
{
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => 
{
    console.error('Uncaught Exception:', error);
});