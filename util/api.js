const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
  async getSummonerId(region, name) {
    let response = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.LEAGUE_API_KEY}`
    );
    let headers = response.headers;
    let data = await response.json();

    return { headers: headers, data: data };
  },

  async getSummonerLeagueStats(region, id) {
    let response = await fetch(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.LEAGUE_API_KEY}`
    );

    let headers = response.headers;
    let data = await response.json();

    return { headers: headers, data: data };
  },

  async getSummonerGame(region, id) {
    let response = await fetch(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${process.env.LEAGUE_API_KEY}`
    );

    let headers = response.headers;
    let data = await response.json();

    return { headers: headers, data: data };
  },

  async getQueue(queueId) {
    let response = await fetch(
      'http://static.developer.riotgames.com/docs/lol/queues.json'
    );

    let data = await response.json();

    return data.filter((queueType) => queueId === queueType.queueId);
  },
};
