require('dotenv').config();
const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const Valorant = require('./commands/valorant');
const valorant = new Valorant()

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'riot',
        description: 'Login riot auth!',        
    },   
    {
        name: 'riot2',
        description: 'Login riot auth2!',        
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

bot.once('ready', ()=>
    {
        console.log('HalBozt is online!');
    }
)

bot.on('interactionCreate', async interaction =>
    {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }

        if(interaction.commandName === 'riot') {
            let message = 'Command excuted'

            try{
                const result = await valorant.authentication(process.env.LOGNAME, process.env.PASSWORD)
                if(result.status == 'OK'){
                    message = 'Authenticate successfully'
                }
                else{
                    message = 'Check your email for mfa code and do the MFA command'
                }
            }
            catch(err){
                console.log(err)
                message = 'Something wrong happened'
            }
            finally {
                await interaction.reply(message);
            }
        }

        if(interaction.commandName === 'riot2') {
            let message = 'Command excuted'

            try{
                const result = await valorant.authentication2(process.env.MULTIFACTORCODE)
                if(result.status == 'OK'){
                    message = 'Authenticate successfully'
                }
                else{
                    message = 'Code expired'
                }
            }
            catch(err){
                console.log(err)
                message = 'Something wrong happened'
            }
            finally {
                await interaction.reply(message);
            }
        }

        if(interaction.commandName === 'logout') {
            let message = 'Command excuted'

            try{
                const result = await valorant.logOut()
                if(result.status == 'OK'){
                    message = 'Logout successfully'
                }
            }
            catch(err){
                console.log(err)
                message = 'Something wrong happened'
            }
            finally {
                await interaction.reply(message);
            }
        }
    }
)

bot.login(process.env.DISCORD_TOKEN);