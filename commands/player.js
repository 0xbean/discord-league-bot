const Discord = require('discord.js');
const api = require('../util/api');
const { getRank } = require('../util/rank');

module.exports = {
  name: 'player',
  description: 'Returns player statistics.',
  args: true,
  usage: '[player region summoner_name]',
  async execute(message, args) {
    message.channel.send('Interesting... Let me take a look...');

    if (args.length >= 2) {
      const region = args.shift();
      const name = args.join(' ');

      let res = await api.getSummonerId(region, name);
      const id = res.data.id;
      res = await api.getSummonerLeagueStats(region, id);
      const leagueData = res.data;

      leagueData.map((league) => {
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(league.queueType.split('_').join(' '))
          .setThumbnail(getRank(`${league.tier} ${league.rank}`))
          .addField('Summoner', league.summonerName)
          .addField('Rank', `${league.tier} ${league.rank}`)
          .addField('LP', league.leaguePoints)
          .addField('Wins', league.wins)
          .addField('Losses', league.losses);

        message.channel.send(exampleEmbed);
      });
    } else {
      message.reply(
        'Please add both arguments, use help with the given command to understand how to use it.'
      );
    }
  },
};
