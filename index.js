require('dotenv').config();
const { REST, Routes, Client, Events, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
const Valorant = require('./commands/valorant');
const valorant = new Valorant()

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'riot',
        description: 'Login riot!',
    },
    {
        name: 'store',
        description: 'Get daily valorant store!',
    },
    {
        name: 'logout',
        description: 'Logout riot!',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

bot.once(Events.ClientReady, () => {
    console.log('HalBozt is online!');
}
)

bot.on(Events.MessageCreate, async message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const cmd = args[0].toLocaleLowerCase();

    switch (cmd) {
        case 'auth2': {
            let msg = 'Command excuted'
            let code = args[1]

            try {
                const result = await valorant.authentication2(code)
                if (result == 'OK') {
                    await valorant.getEntitlement()
                    msg = 'Authenticate successfully'
                }
                else {
                    msg = 'Code expired'
                }
            }
            catch (err) {
                console.log(err)
                msg = 'Error'
            }
            finally {
                message.channel.send(msg);
            }
            break;
        }

        case 'store-update': {
            try {
                valorant.storeUpdate()
                message.channel.send('Store content updated');
            }
            catch (err) {
                console.log(err)
                message.channel.send('Error');
            }

            break;
        }
    }
})

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'riot') {
        let message = 'Command excuted'

        try {
            const result = await valorant.authentication(process.env.LOGNAME, process.env.PASSWORD)
            if (result == 'OK') {
                await valorant.getEntitlement()
                message = 'Authenticate successfully'
            }
            if (result == 'MFA') {
                message = 'Check your email for mfa code and do type \"``auth2 <code>\"'
            }
        }
        catch (err) {
            console.log(err)
            message = 'Error'
        }
        finally {
            await interaction.reply(message);
        }
    }

    if (interaction.commandName === 'store') {
        let message = 'Command excuted'

        try {
            list = await valorant.getDailyStore()
            message = `Today shop:\n - ${list[0]}\n - ${list[1]}\n - ${list[2]}\n - ${list[3]}`
        }
        catch (err) {
            console.log(err)
            message = 'Error'
        }
        finally {
            await interaction.reply(message);
        }
    }

    if (interaction.commandName === 'logout') {
        let message = 'Command excuted'

        try {
            const response = await valorant.logOut()
            if (response.status == 200) {
                message = 'Logout successfully'
            }
        }
        catch (err) {
            console.log(err)
            message = 'Error'
        }
        finally {
            await interaction.reply(message);
        }
    }
}
)

bot.login(process.env.DISCORD_TOKEN);