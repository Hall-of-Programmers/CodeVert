import Command from '../../constants/command';

const SkipCommand: Command = {
    name: 'skip',
    description: 'Pause a song in Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            client.distube.skip(message)
            message.channel.send("**Successfully Skipped the current song!**");
        } catch (err) {
            message.channel.send(
                "**Either you are not in a voice channel or a song is not playing.**"
            );
        }
    },
}

export default SkipCommand;