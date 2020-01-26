const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: 'ping',
    description: 'My Bot Ping',
    execute(message, args) {
        message.channel.send('Pinging ...').then(
            m => {
                let ping = m.createdTimestamp - message.createdTimestamp;
                let choices = ['Is this Really my ping ?', 'Is it Okay ? I cant look !', 'I hope it isnt bad'];
                let response = choices[Math.floor(Math.random() * choices.length)];

                m.edit(`${response}: Bot Latency : ** ${ping} **, API Latency : ** ${Math.round(bot.ping)} **`);
            }
        );
    }
};