require('dotenv').config();
import { Client, Collection } from 'discord.js';
const bot = new Client();
import { readdirSync } from 'fs';

bot.commands = new Collection();

const cmdfiles = readdirSync('./commands/').filter(file => file.endsWith('.js'));
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

        try{
            bot.commands.get(cmd).execute(message, args);
        }
        catch(e){
            console.log(e);
        }

        // switch(cmd)
        // {
        //     case 'help':
        //         bot.commands.get('help').execute(message, args);
        //         break;

        //     case 'ban':
        //         bot.commands.get('ban').execute(message, args);
        //         break;

        //     case 'kick':
        //         bot.commands.get('kick').execute(message, args);
        //         break;
                
        //     case 'role':
        //         bot.commands.get('role').execute(message, args);
        //         break;

        //     case 'image':
        //         bot.commands.get('image').execute(message, args);
        //         break;
                
        //     case 'game':
        //         bot.commands.get('game').execute(message, args);
        //         break;
        // }
    }
)

bot.login(process.env.DISCORD_TOKEN);