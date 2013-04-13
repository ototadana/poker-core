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
  if(isStraightFlush(cards)) {
    return poker.handCategory.STRAIGHT_FLUSH;
  }
  if(isFourOfAKind(cards)) {
    return poker.handCategory.FOUR_OF_A_KIND;
  }
  if(isFullHouse(cards)) {
    return poker.handCategory.FULL_HOUSE;
  }
  if(isFlush(cards)) {
    return poker.handCategory.FLUSH;
  }
  if(isStraight(cards)) {
    return poker.handCategory.STRAIGHT;
  }
  if(isThreeOfAKind(cards)) {
    return poker.handCategory.THREE_OF_A_KIND;
  }
  if(isTwoPair(cards)) {
    return poker.handCategory.TWO_PAIR;
  }
  if(isOnePair(cards)) {
    return poker.handCategory.ONE_PAIR;
  }

  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  return poker.handCategory.HIGH_CARD;

  function isFullHouse(cards) {
    return isThreeOfAKind(cards) && isOnePair(cards);
  }

  function isOnePair(cards) {
    return isNumberOfAKind(cards, 2);
  }

  function isTwoPair(cards) {
    var counts = getCountsOfRank(cards);
    var pair = false;
    for(var i = 0; i < counts.length; i++) {
      if(counts[i] == 2) {
        if(pair) {
          return true;
        }
      }
    }
    return false;
  }

  function isThreeOfAKind(cards) {
    return isNumberOfAKind(cards, 3);
  }

  function isFourOfAKind(cards) {
    return isNumberOfAKind(cards, 4);
  }

  function isNumberOfAKind(cards, number) {
    var counts = getCountsOfRank(cards);
    for(var i = 0; i < counts.length; i++) {
      if(counts[i] == number) {
        return true;
      }
    }
    return false;
  }

  function getCountsOfRank(cards) {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(var i = 0; i < cards.length; i++) {
      counts[cards[i].rank]++;
    }
    return counts;
  }

  function isStraightFlush(cards) {
    return isFlush(cards) && isStraight(cards);
  }

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
      return a.rank - b.rank;
    });
  }

  function isRoyal(cards) {
    if(!isStraight(cards)) {
      return false;
    }
    return cards[0].rank == 10;
  }
}

