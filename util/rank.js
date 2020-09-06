const constants = require('../constants/constants');

module.exports = {
  getRank(rank) {
    let img = '';

    switch (rank) {
      case 'IRON IV':
        img = constants.IRON_4;
        break;
      case 'IRON III':
        img = constants.IRON_3;
        break;
      case 'IRON II':
        img = constants.IRON_2;
        break;
      case 'IRON I':
        img = constants.IRON_1;
        break;
      case 'BRONZE IV':
        img = constants.BRONZE_4;
        break;
      case 'BRONZE III':
        img = constants.BRONZE_3;
        break;
      case 'BRONZE II':
        img = constants.BRONZE_2;
        break;
      case 'BRONZE I':
        img = constants.BRONZE_1;
        break;
      case 'SILVER IV':
        img = constants.SILVER_4;
        break;
      case 'SILVER III':
        img = constants.SILVER_3;
        break;
      case 'SILVER II':
        img = constants.SILVER_2;
        break;
      case 'SILVER I':
        img = constants.SILVER_1;
        break;
      case 'GOLD IV':
        img = constants.GOLD_4;
        break;
      case 'GOLD III':
        img = constants.GOLD_3;
        break;
      case 'GOLD II':
        img = constants.GOLD_2;
        break;
      case 'GOLD I':
        img = constants.GOLD_1;
        break;
      case 'PLATINUM IV':
        img = constants.PLATINUM_4;
        break;
      case 'PLATINUM III':
        img = constants.PLATINUM_3;
        break;
      case 'PLATINUM II':
        img = constants.PLATINUM_2;
        break;
      case 'PLATINUM I':
        img = constants.PLATINUM_1;
        break;
      case 'DIAMOND IV':
        img = constants.DIAMOND_4;
        break;
      case 'DIAMOND III':
        img = constants.DIAMOND_3;
        break;
      case 'DIAMOND II':
        img = constants.DIAMOND_2;
        break;
      case 'DIAMOND I':
        img = constants.DIAMOND_1;
        break;
      case 'MASTER I':
        img = constants.MASTER_1;
        break;
      case 'GRANDMASTER I':
        img = constants.GRANDMASTER_1;
        break;
      case 'CHALLENGER I':
        img = constants.CHALLENGER_1;
        break;
    }

    return img;
  },
};
