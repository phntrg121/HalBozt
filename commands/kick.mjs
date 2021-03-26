export const name = 'kick';
export const hasPermission = function checkPerm(message) {
    if (!message.member.permissions.has("KICH_MEMBERS"))
        return false;
    return true;
};
export function execute(message, args) {
    if (message.mentions.users.size === 1) {
        if (this.hasPermission(message)) {
            var user = message.mentions.users.first();
            message.channel.send(user.toString() + ' đã bị kick');
        }

        else {
            message.channel.send(user.toString() + ' không thể bị kick');
        }
    }
}