import { RickEmbed, Client } from 'discord.js';

export const name = 'role';

const hasPermission = function checkPerm(message) {
    if (!message.member.permissions.has("MANAGE_ROLES_OR_PERMISSIONS"))
        return false;
    return true;
};

function addrole(role, mem, message) {
    if (this.hasPermission(message)) {
        if (mem.roles.cache.has(role)) {
            mem.roles.remove(role);
        }

        else {
            mem.roles.add(role);
        }
        message.react("☑️");
    }

    else {
        var embed = new RickEmbed();

        embed.setAuthor(Client.user.username);

        message.channel.send(user.toString() + ' don\'t have permission');
    }
}

export function execute(message, args) {
    const MASTER_ROLE = process.env.MASTER_ROLE;
    const DOCTOR_ROLE = process.env.DOCTOR_ROLE;
    const TRAVELER_ROLE = process.env.TRAVELER_ROLE;

    var mem;
    if (message.mentions.users.size > 1)
        return;

    if (message.mentions.users.size === 1) {
        mem = message.mentions.members.first();
    }

    else {
        mem = message.member;
    }

    if (args.length === 1) {
        console.log(message.guild.roles);
        //message.chanel.send(message.guild.roles);
    }
    else if (args.length > 1) {
        switch (args[1]) {
            case 'master':
                this.addrole(MASTER_ROLE, mem, message);
                break;
            case 'doctor':
                this.addrole(DOCTOR_ROLE, mem, message);
                break;
            case 'traveler':
                this.addrole(TRAVELER_ROLE, mem, message);
                break;
        }
    }
}