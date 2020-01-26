const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjQ5OTMxOTgzNjY0NzA5NjQy.Xi1idg.leEwR6T2haBxRmYjzQ9WCUHdriI';

const prefix = 'r!';

const ytdl = require('ytdl-core');

const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./app/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./app/${file}`);

    bot.commands.set(command.name, command);
}
var servers = {};

//Status Bot
bot.on('ready', () => {
    console.log('Hello Daddy, Aku siap membantumu ;)');
    // statusnya idle
    bot.user.setStatus('online');
    // bermain sama daddy
    bot.user.setActivity('with Shichimiya', {
        type: 'PLAYING',
    }).catch(console.error());
});

//Testing Message
bot.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        // General Commands
        case 'hello':
            message.reply("Hello Kakak ˆˆ");
            break;
        case 'about':
            message.channel.sendMessage("I am Daddy's maid bot @Rakkina Hito, I was made with him love so I love Daddy ˆˆ ");
            break;
        case 'info':
            if (args[1] === 'version') {
                message.channel.sendMessage("In this time my version is 1.1.0 Beta ;)");
            } else if (args[1] === 'author') {
                message.channel.sendMessage("My Author is Daddy Rakkina Hito (๑♡v♡๑)");
            } else if (args[1] === 'ping') {
                bot.commands.get('ping').execute(message, args);
            } else {
                message.reply("Im Sorry, I dont understand please specific the info (๑°⌓°๑) version and author");
            }
            break;
        case 'daddy':
            if (args[1] === 'partner') {
                message.channel.sendMessage("My Daddy Partner is Bro. <@512265701294342164> (つ≧▽≦)つ");
            } else if (args[1] === 'youtube') {
                message.channel.sendMessage("Daddy Youtube channel is https://www.youtube.com/channel/UCs9y6V_hL4NhkCHZKxfKgPA, Don't forget like and subscribe !");
            } else {
                message.reply("Im Sorry, I dont understand please specific the info about daddy (๑°⌓°๑) partner and youtube");
            }
            break;
        case 'clear':
            if (!args[1]) {
                message.reply('Im Sorry, Please define the length for clearing message');
            } else {
                message.channel.bulkDelete(args[1]);
                message.reply('Im done, ' + args[1] + ' Messages has been cleared ( ‾́ ◡ ‾́ )');
            }
            break;
            //Music Commands
        case 'music':
            bot.commands.get('music').execute(message, args);
            break;
        case 'poll':
            bot.commands.get('poll').execute(message, args);
            break;
    }
})

//Bot Login ke discord 
bot.login(token);
