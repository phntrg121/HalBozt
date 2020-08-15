module.exports =
{
    name: 'role',

    hasPermission: function checkPerm(message) {
        if(!message.member.permissions.has("MANAGE_ROLES_OR_PERMISSIONS")) return false;
        return true;
    },

    addrole: function addrole(role, mem, message)
    {
        if(this.hasPermission(message))
        {
            if(mem.roles.cache.has(role))
            {
                mem.roles.remove(role);
            }
            else
            {
                mem.roles.add(role);
            } 
            message.react("☑️");
        }
        else
        {
            message.channel.send(user.toString() + ' không có quyền sửa role');
        }
    },

    execute(message, args)
    {
        const MOD_ROLE = '735155120496443513';
        const HUE_ROLE = '729384990076436550';
        const EX_ROLE = '729551734590144532';
        const MASTER_ROLE = '729390153784885268';
        const DOCTOR_ROLE = '735502501867946085';

        var mem;
        if(message.mentions.users.size === 1)
        {
            mem = message.mentions.members.first();
        }
        else
        {
            mem = message.member;
        }

        if(args.length === 1)
        {
            message.chanel.send(message.guild.roles);
        }
        else if(args.length > 1)
        {
            switch(args[1])
            {
                case 'ex':
                    this.addrole(EX_ROLE,mem,message)
                    break;
                case 'hue':
                    this.addrole(HUE_ROLE,mem,message);
                    break;
                case 'master':
                    this.addrole(MASTER_ROLE,mem,message);
                    break;
                case 'doctor':
                    this.addrole(DOCTOR_ROLE,mem,message);
                    break;
            }
        }
    }
}