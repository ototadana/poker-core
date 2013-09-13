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
isFlush(cards);
  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  if (isRoyalFlush(cards)) {return poker.handCategory.ROYAL_FLUSH;}
  if (isStraightFlush(cards)) {return poker.handCategory.STRAIGHT_FLUSH;}
  if (isFourOfAKind(cards)) {return poker.handCategory.FOUR_OF_A_KIND;}
  if (isThreeOfAKind(cards)) {return poker.handCategory.THREE_OF_A_KIND;}
  if (isStraight(cards) ) { return poker.handCategory.STRAIGHT; }
  if (isFlush(cards)) { return poker.handCategory.FLUSH; }
  if (isFullHouse(cards) ){ return poker.handCategory.FULL_HOUSE; }
  
  if (isTwoPair(cards)) {return poker.handCategory.TWO_PAIR;}
  if (isOnePair(cards)){return poker.handCategory.ONE_PAIR;}


  return poker.handCategory.HIGH_CARD;
}

  function isRoyalFlush(cards){return true;}
  function isStraightFlush(cards){return true;}
  function isFourOfAKind(cards){return true;}
  function isTwoPair(cards){return true;}
  function isOnePair(cards){return true;}
  function　isStraight(cards){return false;}
  // function　isFlush(cards){return false;}
  function　isFullHouse(cards){return false;}
  function　isThreeOfAKind(cards){return false;}

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

/**
 * フラッシュを判定するメソッド
 * @param cards かーど
 * @return とるー/ふぉるす
 */
function isFlush(cards) {
  console.log("isFlush");
  var isSuccess = false;
  if (cards[0].suit === cards[1].suit && cards[1].suit === cards[2].suit && cards[2].suit === cards[3].suit && cards[3].suit === cards[4].suit) {
    isSuccess = true;
  }
  return isSuccess;
}
