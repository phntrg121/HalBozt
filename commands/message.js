module.exports =
{
    name: 'message',
    execute(bot, message, args)
    {
        if(args.length < 3) return;

        var msg =''
            for (i = 2; i < args.length; i++) {
                msg += args[i] + ' ';
              }

        if(message.mentions.channels.size === 1 && message.mentions.users.size === 0)
        {
            var id = message.mentions.channels.first().id;
            bot.channels.cache.get(id).send(msg);
            message.delete();
            return;
        }

        if(message.mentions.users.size === 1 && message.mentions.channels.size === 0)
        {
            var user = message.mentions.users.first();
            user.send(msg);
            message.delete();
            return;
        }    
    }
}