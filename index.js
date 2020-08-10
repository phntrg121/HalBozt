const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzQwODE5MDYyMDE5MzI2MDQ1.XyujhA._s7pUfeo-zbiz7UFN4V0U6KY_bs';
const prefix = '_';
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
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
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
                console.log('HalBozt say something');
                break;

            case 'gay':
                bot.commands.get('gay').execute(message, args);
                console.log('HalBozt gay');
                break;
        }
    }
)

bot.login(token);