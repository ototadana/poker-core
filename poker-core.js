/**
 * ポーカー
 * @namespace
 */
var poker = {};

/**
 * ポーカー・ハンド
 * @enum {number}
 */
poker.handCategory = {
  HIGH_CARD       :   0,
  ONE_PAIR        : 100,
  TWO_PAIR        : 200,
  THREE_OF_A_KIND : 300,
  STRAIGHT        : 400,
  FLUSH           : 500,
  FULL_HOUSE      : 600,
  FOUR_OF_A_KIND  : 700,
  STRAIGHT_FLUSH  : 800,
  ROYAL_FLUSH     : 900
};


/**
 * コアライブラリ
 * @namespace
 */
poker.core = {};


/**
 * 役判定する。
 *
 * @param {{rank:number, suit:string}[]} cards 手札。
 * @returns poker.handCategory のどれか。
 */
poker.core.getHandCategory = function(cards) {
  // TODO: ここに処理を実装します。
  if(isRoyalFlush(cards)) {
    return poker.handCategory.ROYAL_FLUSH;
  }

  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  return poker.handCategory.HIGH_CARD;

  function isRoyalFlush(cards) {
    return isFlush(cards) && isRoyal(cards);
  }

  function isFlush(cards) {
    var suit = cards[0].suit;
    for(var i = 0; i < cards.length; i++) {
      if(suit != cards[i].suit) {
        return false;
      }
    }
    return true;
  }

  function isStraight(cards) {
    sortByRank(cards);
    var rank = cards[0].rank;
    for(var i = 0; i < cards.length; i++) {
      if(rank + i != cards[i].rank && !(rank + i == 14 && cards[i].rank == 1)) {
        return false;
      }
    }
    return true;
  }

  function sortByRank(cards) {
    cards.sort(function(a, b){
      if(a.rank == b.rank) {
        return 0;
      }
      if(a.rank == 1) {
        return 1;
      }
      if(b.rank == 1) {
        return -1;
      }
      return 0;
    });
  }

  function isRoyal(cards) {
    if(!isStraight(cards)) {
      return false;
    }
    return cards[0].rank == 10;
  }
}

