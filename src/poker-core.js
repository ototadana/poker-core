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
  // 事前準備
  var sorted = cards.sort(function(a,b)
  {return (a.rank>b.rank)?1:(a.rank==b.rank)?0:-1; });
  var diffs = [];
  for (var i=0; i<4; i++) { diffs.push(sorted[i+1].rank - sorted[i].rank); }
  var suit = {};
  cards.forEach(function(a){if (suit[a.suit]) suit[a.suit]++; else suit[a.suit] = 1;});
  var isAllCardsSameSuit = Object.keys(suit).length == 1;
  // 10・J・Q・K・Aの組み合わせで、かつ全て同じマークならば、ロイヤルストレートフラッシュ
  // 5枚のカードが連番で、なおかつ全て同じマークならば、ストレートフラッシュ
  // 同じ数字のカードが4枚あれば、フォー・オブ・ア・カインド
  // ワンペアとスリー・オブ・ア・カインドの組み合わせで、フルハウス
  // 5枚全てが同じマークならば、フラッシュ
  if (isAllCardsSameSuit)
    return poker.handCategory.FLUSH;
  // 5枚の数字が連続していれば、ストレート
  // 同じ数字が3枚あれば、スリー・オブ・ア・カインド
  // 同じ数字のカードのペアが2組あれば、ツーペア
  // 同じ数字のカードが2枚あれば、ワンペア


  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  return poker.handCategory.HIGH_CARD;
};
