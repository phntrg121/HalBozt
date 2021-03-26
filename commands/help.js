import { RickEmbed, Client } from 'discord.js';

export const name = 'help';

export function execute(message, args) {

    var embed = new RickEmbed();

    embed.setAuthor(Client.user.username, Client.user.displayAvatarURL);
    embed.setDescription('Cút, help cc');
    embed.setColor('GREEN');

    message.channel.send(embed);
    console.log('help');
}