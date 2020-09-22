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
        .setColor('#FFDC00')
        .setTitle(title);

      message.channel.send(embed);

      const soloRankedData = [];

      for (let player of game.participants) {
        let res = await api.getSummonerLeagueStats(region, player.summonerId);
        const leagueData = res.data;
        const soloRanked = leagueData.filter((ranked) =>
          ranked.queueType.includes('SOLO')
        )[0];
        soloRankedData.push({ team: player.teamId, ranked: soloRanked });
      }

      const sortedSoloRankedData = soloRankedData.sort((playerOne, playerTwo) =>
        playerOne.team > playerTwo.team ? 1 : -1
      );

      sortedSoloRankedData.map((league) => {
        setTimeout(() => {
          embed = new Discord.MessageEmbed()
            .setColor(league.team === 100 ? '#29edfd' : '#fb1474')
            .setTitle(league.team === 100 ? 'Team 1' : 'Team 2')
            .addFields(
              {
                name: 'Summoner',
                value: league.ranked.summonerName,
              },
              {
                name: 'Queue Type',
                value: league.ranked.queueType.split('_').join(' '),
              },
              {
                name: 'Rank',
                value: `${league.ranked.tier} ${league.ranked.rank}`,
              },
              {
                name: 'LP',
                value: league.ranked.leaguePoints,
              },
              {
                name: 'Wins',
                value: league.ranked.wins,
              },
              {
                name: 'Losses',
                value: league.ranked.losses,
              }
            )
            .setThumbnail(
              getRank(`${league.ranked.tier} ${league.ranked.rank}`)
            );
          message.channel.send(embed);
        }, 1000);
      });
    } else {
      message.reply(
        'Please add both arguments, use help with the given command to understand how to use it.'
      );
    }
  },
};
