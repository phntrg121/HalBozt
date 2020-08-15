module.exports =
{
    name: 'saysomething',
    execute(message, args)
    {
        mention_u = message.mentions.users.size;
        if(mention_u >= 2) return;

        if(mention_u === 0)
        {
            var num = Math.floor((Math.random() * 6) + 1);
            switch(num)
            {
                case 1:
                    message.channel.send('I, Giorno Giovanna, have a dream');
                    break;                    
                case 2:
                    message.channel.send('Trap is not gay');
                    break;    
                case 3:
                    message.channel.send('Say say cc');
                    break;                    
                case 4:
                    message.channel.send('Eximmemom');
                    break;                    
                case 5:
                    message.channel.send('...');
                    break;                    
                case 6:
                    message.channel.send(message.author.toString() +' ngu loz');
                    break;
            }
        }
        else
        {
            var user = message.mentions.users.first();
            var num = Math.floor((Math.random() * 3) + 1);
            switch(num)
            {
                case 1:
                    message.channel.send(user.toString() + ' là thằng đầu buồi rẻ rách');
                    break;                    
                case 2:
                    message.channel.send(user.toString() + ' vô dụng vcl');
                    break;    
                case 3:
                    message.channel.send(user.toString() + ' is fuckin gay');
                    break;
            }
        }
        
    }
}