module.exports =
{
    name: 'help',
    execute(message, args)
    {
        message.channel.send('Các lệnh hiện có:\n'+
        '\t1. help\n'+
        '\t2. saysomething\n'+
        '\t3. ban\n'+
        '\t4. kick\n'+
        '\t5. role\n'+
        '\t6. message\n'+
        'Vậy thôi, dùng thì dùng, không thì cút :))'
        );
    }
}