const Discord = require('discord.js');
const api = require('../util/api');
const { getRank } = require('../util/rank');

module.exports = {
  name: 'game',
  description: 'Returns the players current game.',
  args: true,
  usage: '[player region summoner_name]',
  async execute(message, args) {
    message.channel.send('Interesting... Let me take a look...');

    if (args.length >= 2) {
      const region = args.shift();
      const name = args.join(' ');

      let res = await api.getSummonerId(region, name);
      const id = res.data.id;
      res = await api.getSummonerGame(region, id);

      const game = res.data;
      const queueType = await api.getQueue(game.gameQueueConfigId);
      let title = queueType[0].description.split(' ');
      if (title[title.length - 1] === 'games') {
        title.pop();
      }

      title = title.join(' ');

      let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(title);

      game.participants.map(async (player) => {
        let res = await api.getSummonerLeagueStats(region, player.summonerId);
        const leagueData = res.data;

        leagueData
          .filter((ranked) => ranked.queueType.includes('SOLO'))
          .map((league) => {
            embed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle(player.teamId === 100 ? 'Team 1' : 'Team 2')
              .addFields(
                {
                  name: 'Summoner',
                  value: league.summonerName,
                },
                {
                  name: 'Queue Type',
                  value: league.queueType.split('_').join(' '),
                },
                {
                  name: 'Rank',
                  value: `${league.tier} ${league.rank}`,
                },
                {
                  name: 'LP',
                  value: league.leaguePoints,
                },
                {
                  name: 'Wins',
                  value: league.wins,
                },
                {
                  name: 'Losses',
                  value: league.losses,
                }
              )
              .setThumbnail(getRank(`${league.tier} ${league.rank}`));

            message.channel.send(embed);
          });
      });

      message.channel.send(embed);
    } else {
      message.reply(
        'Please add both arguments, use help with the given command to understand how to use it.'
      );
    }
  },
};
