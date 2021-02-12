const Discord = require("discord.js");
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);

const {
    General,
    Games,
    Moderation,
    Music,
    Events,
    Notify,
    NSFW,
    MISC,
} = require("./helpcmds");

module.exports = {
    name: "help",
    description: "Lists bot commands.",
    usage: "help",
    aliases: ["commands", "cmds"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    let prefix = "!";
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(`Server Prefix: \`${prefix}\``)
        .addField(
            "To learn a command and its proper use, specify it's module in help command.",
            "Example: ` !help games `"
        )
        .addField(
            `${General.emoji} ${General.name}`,
            `\`${General.number}\``,
            true
        )
        .addField(`${Games.emoji} ${Games.name}`, `\`${Games.number}\``, true)
        .addField(
            `${Moderation.emoji} ${Moderation.name}`,
            `\`${Moderation.number}\``,
            true
        )
        .addField(`${Music.emoji} ${Music.name}`, `\`${Music.number}\``, true)
        .addField(
            `${Events.emoji} ${Events.name}`,
            `\`${Events.number}\``,
            true
        )
        .addField(
            `${Notify.emoji} ${Notify.name}`,
            `\`${Notify.number}\``,
            true
        )
        .addField(`${NSFW.emoji} ${NSFW.name}`, `\`${NSFW.number}\``, true)
        .addField(`${MISC.emoji} ${MISC.name}`, `\`${MISC.number}\``, true)
        .setColor(bot.config.color);

    let categories = await readdir("./commands/");
    categories.forEach((c) => {
        let commands = fs
            .readdirSync("./commands/" + c + "/")
            .filter((file) => file.endsWith(".js"));
        if (commands.length > 0) {
            let files = commands
                .map((cmd) => "`" + cmd.replace(".js", "") + "`")
                .join(" ");
            embed.setFooter(`Total Commands: ${files.length}`);
        }
    });

    return message.channel.send(embed);
};
