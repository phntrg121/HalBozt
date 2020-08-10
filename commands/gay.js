module.exports =
{
    name: 'gay',
    execute(message, args)
    {
        if(message.mentions.users.size === 0) return;
        message.channel.send(message.mentions.users.first().toString() + ' is fuckin gay');
    }
}