module.exports =
{
    name: 'saysomething',
    execute(message, args)
    {
        var num = Math.floor((Math.random() * 10) + 1);
        switch(num)
        {
            case 1:
                message.channel.send('I, Giorno Giovanna, have a dream');
                break;
                
            case 2:
                message.channel.send('Trap is not gay');
                break;

            case 3:
                message.channel.send('Không làm mà muốn có ăn thì ăn c*t, ăn đầu bu*i');
                break;
                
            case 4:
                message.channel.send('Eximmemom');
                break;
                
            case 5:
                message.channel.send('...');
                break;
                
            case 6:
                message.channel.send('You expected the bot, but it was me, DIO');
                break;
                
            case 7:
                message.channel.send(message.author.toString() +' ngu loz');
                break;

            default:
                message.channel.send('Say say cc');
                break;
        }
    }
}