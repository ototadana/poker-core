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
 * 同種のカード（ペア）のペアの枚数の最大値を返す
 */
poker.core.getMaxNum = function(pairs) {
	var max = 0;
	for (var rank in pairs) {
		max = (max >= pairs[rank]) ? max : pairs[rank];
	}
	return max;
}

/**
 * 同種のカード（ペア）の枚数を取り出す。{番号:枚数, ...}が返る。
 */
poker.core.getPairs = function(cards) {
	var rval = new Array();
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].rank in rval) {
			rval[cards[i].rank] += 1;
		} else {
			rval[cards[i].rank] = 1;
		}
	}
	return rval;
}

/**
 * 同種のカード（ペア）の数を返す。
 */
poker.core.getNumPairs = function(pairs) {
	var rval = 0;
	for (var i in pairs) {
		rval ++;
	}
	return rval;
}

/**
 * 配列の要素のうち最小値を返す。
 */
poker.core.min = function(array) {
	var rval = Number.POSITIVE_INFINITY;
	for (var i = 0; i < array.length; i++) {
		rval = (rval > array[i]) ? array[i] : rval;
	}
	return rval;
}

/**
 * 配列の要素のうち最大値を返す。
 */
poker.core.max = function(array) {
	var rval = Number.NEGATIVE_INFINITY;
	for (var i = 0; i < array.length; i++) {
		rval = (rval < array[i]) ? array[i] : rval;
	}
	return rval;
}

/**
 * カードが連番かどうかを返す。
 * この関数を呼ぶ時点で、カードに同じものが合ってはならない。
 * Aについては、1または14とみなす。つまり、A, 2, 3, 4, 5とA, K, Q, J, 10の場合は連番とみなす。
 */
poker.core.isSeries = function(cards) {
	//Aが入っている場合だけ、Ato5, 10toAの両方を調べる
	var ranks = [];
	for (var i = 0; i < cards.length; i++) {
		ranks[i] = cards[i].rank;
	}
	return poker.core.isSeriesArray(ranks);
}
poker.core.isSeriesArray = function(array) {
	var sorted = array.sort( function (a,b) { return a - b; } ); //辞書順にされないように
	//alert("sorted="+sorted);
	var min = poker.core.min(sorted);
	var max = poker.core.max(sorted);
	
	//alert("sorted="+sorted+", min="+min+",max="+max);
	
	if (min + 4 == max) {
		return true;
	}
	if (min == 1) {
		//1番めに1が入っているはず
		sorted[0] = 14 // Aを14とみなす
		return poker.core.isSeriesArray(sorted);
	}
	
	return false;
}

/**
 * 全てのカードが同じマークかどうかを返す。
 */
poker.core.isSameMark = function(cards) {
	var isSame = true;
	var mark = cards[0].suit;
	for (var i = 1; i < cards.length; i++) {
		if (mark != cards[i].suit) {
			isSame = false;
			break;
		}
	}
	return isSame;
}
/**
 * カードが10からAかを返す。
 * この関数を呼ぶ時点で、カードに同じものが合ってはならない。
 */
poker.core.has10toA = function(cards) {
	var target = {10:1, 11:1, 12:1, 13:1, 1:1};
	var hasTgts = true;
	for (var i = 0; i < cards.length; i++) {
		if (!(cards[i].rank in target)) {
			hasTgts = false;
			break;
		}
	}
	return hasTgts;
}

/**
 * 役判定する。
 *
 * @param {{rank:number, suit:string}[]} cards 手札。
 * @returns poker.handCategory のどれか。
 */
poker.core.getHandCategory = function(cards) {
	// TODO: ここに処理を実装します。

	//同じ種類のカードのチェック
	//同種のカード（ペア）の枚数を取り出す。{番号:枚数, ...}が返る。
	var pairs = poker.core.getPairs(cards);
	//ペアの枚数の最大値
	var max = poker.core.getMaxNum(pairs);
	//ペアの数
	var numPairs = poker.core.getNumPairs(pairs);

	if (max == 2) {
		if (numPairs == 4) {
			return poker.handCategory.ONE_PAIR;
		} else if (numPairs == 3) {
			return poker.handCategory.TWO_PAIR;
		}
	} else if (max == 3) {
		if (numPairs == 3) {
			return poker.handCategory.THREE_OF_A_KIND;
		} else if (numPairs == 2) {
			return poker.handCategory.FULL_HOUSE;
		}
	} else if (max == 4) {
		return poker.handCategory.FOUR_OF_A_KIND;
	}

	//ここまでで同じカードが存在しないことは確認済み

	//連番のカードのチェック
	var isSeries = poker.core.isSeries(cards);
	//全てのカードが同じマークかどうかのチェック
	var isSameMark = poker.core.isSameMark(cards);

	if (isSameMark) {
		if (poker.core.has10toA(cards)) { //カードが10からAか
			return poker.handCategory.ROYAL_FLUSH;
		} else if (isSeries) {
			return poker.handCategory.STRAIGHT_FLUSH;
		} else {
			return poker.handCategory.FLUSH;
		}
	} else if (isSeries) {
		return poker.handCategory.STRAIGHT;
	}

  // どの組み合わせにも当てはまらないならば、ハイカードを返す。
  return poker.handCategory.HIGH_CARD;
}
