import Command from '../../constants/command';
import { createCanvas } from 'canvas'
import { default as axios } from 'axios'

const TriviaCommand: Command = {
    name: 'trivia',
    description: 'Play trivia in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        await axios.get("https://opentdb.com/api.php", {
            params: {
                amount: 1,
                type: args[0],
                encode: 'url3986',
                difficulty: args[1]
            }
        }).then((res) => {
            console.log(res.data)
        })
    },
}

export default TriviaCommand;