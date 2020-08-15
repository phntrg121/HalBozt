require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

bot.commands = new Discord.Collection();

const cmdfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of cmdfiles)
{
    const cmd = require(`./commands/${file}`);
    bot.commands.set(cmd.name, cmd);
}



bot.once('ready', ()=>
    {
        console.log('HalBot is online!');
    }
)

bot.on('message', message=>
    {
        if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
        const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
        const cmd = args[0].toLocaleLowerCase();

        switch(cmd)
        {
            case 'help':
            case 'h':
                bot.commands.get('help').execute(message, args);
                console.log('HalBozt do help');
                break;            
            case 'saysomething':
            case 'ss':
                bot.commands.get('saysomething').execute(message, args);
                console.log('HalBozt say');
                break;
            case 'ban':
                bot.commands.get('ban').execute(message, args);
                console.log('HalBozt ban');
                break;
            case 'kick':
                bot.commands.get('kick').execute(message, args);
                console.log('HalBozt kick');
                break;
            case 'role':
                bot.commands.get('role').execute(message, args);
                console.log('HalBozt change role');
                break;
            case 'img':
                bot.commands.get('img').execute(message, args);
                console.log('HalBozt img');
                break;
            case 'message':
            case 'msg':
                bot.commands.get('message').execute(bot, message, args);
                console.log('HalBozt send message');
                break;

        }
    }
)

bot.login(process.env.DISCORD_TOKEN);