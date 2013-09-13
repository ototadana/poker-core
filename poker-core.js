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
 */isRoyalFlush()
poker.core.getHandCategory = function(cards) {

  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  if (isRoyalFlush() == true) {return poker.handCategory.ROYAL_FLUSH;}
  if (isStraightFlush() == true) {return poker.handCategory.STRAIGHT_FLUSH;}
  if (isFourOfAKind() == true) {return poker.handCategory.FOUR_OF_A_KIND;}
  if (isThreeOfAKind() == true) {return poker.handCategory.THREE_OF_A_KIND;}
  if (isStraight() == true ) { return poker.handCategory.STRAIGHT; }
  if (isFlush() == true) { return poker.handCategory.FLUSH; }
  if (isFullHouse() == true ){ return poker.handCategory.FULL_HOUSE; }
  
  if (isTwoPair() == true) {return poker.handCategory.TWO_PAIR;}
  if (isOnePair() == true){return poker.handCategory.ONE_PAIR;}


  return poker.handCategory.HIGH_CARD;
}

  function isRoyalFlush(cards){return false;}
  function isStraightFlush(cards){return false;}
  function isFourOfAKind(cards){return false;}
  function isTwoPair(cards){return false;}
  function isOnePair(cards){return false;}
  function　isStraight(){return false;}
  function　isFlush(){return false;}
  function　isFullHouse(){return false;}
  function　isThreeOfAKind(){return false;}

/*
 * 同種のカード（ペア）の枚数を取り出す。{番号:枚数, ... }が返る。
 */
poker.core.getPairs = function(cards) {
  var rval = new Array();
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].rank in rval) {
      rval[cards[i].rank] += 1;
    } else {
      rval[cards[i].rank] = 1;
    }
    return rval;
  }
}  
