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

  // 事前準備
  sorted = cards.sort(function(a,b)
  {return (a.rank>b.rank)?1:(a.rank==b.rank)?0:-1; });
  diffs = [];
  for (i=0; i<4; i++) { diffs.append(sorted[i+1].number - sorted[i].number); }
  suit = {};
  suit["♣"] = suit["♦"] = suit["♥"] = suit["♠"] = 0;
  cards.forEach(function(a){suit[a.suit]++;});

  // ROYAL_FLASH など


  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  return poker.handCategory.HIGH_CARD;
};
