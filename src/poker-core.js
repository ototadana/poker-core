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
  var heart = poker.core.countHearts(cards,"♥");
  var spade = poker.core.countHearts(cards,"♠");
  var daia = poker.core.countHearts(cards,"♦");
  var clover = poker.core.countHearts(cards,"♣");
  
  var varIsSameMark = isSameMark(cards);
  if(varIsSameMark=true){
    return poker.handCatefory.FLUSH;
  }
  



  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  return poker.handCategory.HIGH_CARD;
};


poker.core.countHearts=function(cards,suit){
  var mark=[];
  for(var i =1; i < 14; i++){
    mark[i]=0;
  }
  for(i = 0; i < cards.length; i++){
    if(cards[i].suit == suit){
      mark[cards[i].rank]++;
    }
  }
  return mark;
};
poker.core.isSameMark= function(cards){
  var bolvalue=true;
  var valmark= cards[0].suit;
  for (var i in cards){
    if (valmark != cards[i].suit){
      bolvalue = false;
      break;
    }
  }
  return bolvalue;
}
poker.core.solveSF = function(cards) {

  /**  
  return poker.handCategory.STRAIGHT_FLUSH;
  */
};