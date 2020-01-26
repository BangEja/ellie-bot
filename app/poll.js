const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Membuat Voting Ya/Tidak',
    execute(message, args) {
        const fallEmbed = new Discord.RichEmbed()
            // Set the title of the field
            .setTitle('Vote Commands !')
            // Set the color of the embed
            .setColor(0xFF0000)
            // Set the main content of the embed
            .setDescription("Wait..., I don't know what we must vote ?");
        // Send the embed to the same channel as the message
        if (!args[1]) {
            message.channel.send(fallEmbed);
            return;
        }
        let pesanVote = args.slice(1).join(" ");

        const voteEmbed = new Discord.RichEmbed()
            // Set the title of the field
            .setTitle('Voting Time, Yes/No !')
            // Set the color of the embed
            .setColor(0xFF0000)
            // Set the main content of the embed
            .setDescription(pesanVote);
        // Send the embed to the same channel as the message

        message.channel.send(voteEmbed).then(messageReaction => {
            messageReaction.react("👍");
            messageReaction.react("👎");
            message.delete(2000).catch(console.error);
        });
    }
};