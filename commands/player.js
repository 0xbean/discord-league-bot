const api = require('../util/api');

module.exports = {
  name: 'player',
  description: 'Returns player statistics.',
  args: true,
  usage: '[player region summoner_name]',
  async execute(message, args) {
    message.channel.send('Interesting... Let me take a look...');

    if (args.length === 2) {
      let res = await api.getSummonerId(args[0], args[1]);
      const id = res.data.id;
      res = await api.getSummonerLeagueStats(args[0], id);
      const leagueData = res.data;

      leagueData.map((league) => {
        message.channel.send(`
Queue Type: ${league.queueType.split('_').join(' ')}
Tier: ${league.tier} ${league.rank}
LP: ${league.leaguePoints}
Wins: ${league.wins}
Losses: ${league.losses}
        `);
      });
    } else {
      message.reply(
        'Please add both arguments, use help with the given command to understand how to use it.'
      );
    }
  },
};
