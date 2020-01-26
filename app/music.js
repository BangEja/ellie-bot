const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const bot = new Discord.Client();
servers = {};

module.exports = {
    name: 'music',
    description: "Ellie Music Commands",
    execute(message, args) {
        switch (args[1]) {
            case 'play':
                // Function Play
                function play(connection, message) {
                    var server = servers[message.guild.id];
                    server.dispatcher = connection.playStream(ytdl(server.queue[0], {
                        filter: 'audioonly'
                    }));
                    server.queue.shift();
                    server.dispatcher.on("end", function () {
                        if (server.queue[0]) {
                            play(connection, message);
                        } else {
                            connection.disconnect();
                            message.channel.sendMessage('Okay Thank you for listening music with me. Good Bye ;)');
                        }
                    });
                }
                if (!args[2]) {
                    message.reply("Im Sorry, I don't know what i must to play. Give me the Youtube Link");
                    return
                }
                if (!message.member.voiceChannel) {
                    message.reply("Hey Where are you ?, I Don't Know where you are ! (｡•᎔•｡)");
                    return
                }
                if (!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                }
                var server = servers[message.guild.id];
                server.queue.push(args[2]);
                if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                    play(connection, message);
                })
                const embedSong = new Discord.RichEmbed()
                    // Set the title of the field
                    .setTitle('Listening a Music')
                    // Set the color of the embed
                    .setColor(0x9e46c9)
                    // Set the main content of the embed
                    .setDescription("Okay in this time, let's we listen this music together");
                // Send the embed to the same channel as the message
                message.channel.send(embedSong)
                break;
            case 'skip':
                var server = servers[message.guild.id];
                if (server.dispatcher) server.dispatcher.end();
                const embedSkip = new Discord.RichEmbed()
                    // Set the title of the field
                    .setTitle('Listening a Music')
                    // Set the color of the embed
                    .setColor(0x9e46c9)
                    // Set the main content of the embed
                    .setDescription("Let's we listen the next music ˆˆ");
                // Send the embed to the same channel as the message
                message.channel.send(embedSkip)
                break;
            case 'stop':
                var server = servers[message.guild.id];
                if (message.guild.voiceConnection) {
                    for (var i = server.queue.length - 1; i >= 0; i--) {
                        server.queue.splice(i, 1);
                    }
                    server.dispatcher.end();
                    message.reply('Okay Thank you for listening music with me. Good Bye ;)');
                    console.log('stopped the queue');
                }
                if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                break;
        }
    }
};
