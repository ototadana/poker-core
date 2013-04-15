module("poker.core.getHandCategory");


test("同じ数字のカードが2枚あれば、ワンペア", function(){
  // setup
  var cards = [
    {rank:9,  suit:"♣"},
    {rank:9,  suit:"♦"},
    {rank:1,  suit:"♣"},
    {rank:8,  suit:"♥"},
    {rank:5,  suit:"♠"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.ONE_PAIR);
});


test("同じ数字のカードのペアが2組あれば、ツーペア", function(){
  // setup
  var cards = [
    {rank:9,  suit:"♣"},
    {rank:9,  suit:"♦"},
    {rank:5,  suit:"♣"},
    {rank:5,  suit:"♥"},
    {rank:1,  suit:"♠"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.TWO_PAIR);
});


test("同じ数字が3枚あれば、スリー・オブ・ア・カインド", function(){
  // setup
  var cards = [
    {rank:9,  suit:"♣"},
    {rank:9,  suit:"♦"},
    {rank:9,  suit:"♠"},
    {rank:1,  suit:"♥"},
    {rank:7,  suit:"♠"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.THREE_OF_A_KIND);
});


test("5枚の数字が連続していれば、ストレート", function(){
  // setup
  var cards = [
    {rank:8,  suit:"♥"},
    {rank:7,  suit:"♦"},
    {rank:6,  suit:"♦"},
    {rank:5,  suit:"♠"},
    {rank:4,  suit:"♥"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.STRAIGHT);
});


test("5枚全てが同じマークならば、フラッシュ", function(){
  // setup
  var cards = [
    {rank:13, suit:"♥"},
    {rank:10, suit:"♥"},
    {rank:9,  suit:"♥"},
    {rank:6,  suit:"♥"},
    {rank:2,  suit:"♥"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.FLUSH);
});


test("ワンペアとスリー・オブ・ア・カインドの組み合わせで、フルハウス", function(){
  // setup
  var cards = [
    {rank:5, suit:"♣"},
    {rank:5, suit:"♦"},
    {rank:5, suit:"♥"},
    {rank:8, suit:"♥"},
    {rank:8, suit:"♠"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.FULL_HOUSE);
});


test("同じ数字のカードが4枚あれば、フォー・オブ・ア・カインド", function(){
  // setup
  var cards = [
    {rank:5, suit:"♣"},
    {rank:5, suit:"♦"},
    {rank:5, suit:"♥"},
    {rank:5, suit:"♠"},
    {rank:8, suit:"♥"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.FOUR_OF_A_KIND);
});


test("5枚のカードが連番で、なおかつ全て同じマークならば、ストレートフラッシュ", function(){
  // setup
  var cards = [
    {rank:8, suit:"♥"},
    {rank:7, suit:"♥"},
    {rank:6, suit:"♥"},
    {rank:5, suit:"♥"},
    {rank:4, suit:"♥"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.STRAIGHT_FLUSH);
});


test("10・J・Q・K・Aの組み合わせで、かつ全て同じマークならば、ロイヤルストレートフラッシュ", function(){
  // setup
  var cards = [
    {rank:10, suit:"♥"},
    {rank:11, suit:"♥"},
    {rank:12, suit:"♥"},
    {rank:13, suit:"♥"},
    {rank:1,  suit:"♥"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.ROYAL_FLUSH);
});



test("どの組み合わせにも当てはまらないならば、ハイカード", function(){
  // setup
  var cards = [
    {rank:1,  suit:"♣"},
    {rank:9,  suit:"♣"},
    {rank:8,  suit:"♥"},
    {rank:7,  suit:"♦"},
    {rank:5,  suit:"♠"}
  ];

  // expect
  equal(poker.core.getHandCategory(cards), poker.handCategory.HIGH_CARD);
});
