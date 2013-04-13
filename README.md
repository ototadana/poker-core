======================
ポーカーゲームの役判定プログラム作成の環境です。  

  
構成
----
    - src/main/js/poker-core.js               ... これから作成するプログラム
    - src/test/js/poker-coreTest.js           ... poker-core.js のユニットテスト
    - src/test/resources/poker-coreTest.html  ... poker-coreTest.js を実行するHTML

  
実装の進め方
------------
###事前に準備が必要な開発環境###
1. ブラウザ（Chrome でも IEでもお好きなものを）
2. テキストエディタ（お好きなものを。でもメモ帳はやめておいたほうがいいかも。。）

以上です。  


###実装の進め方###
poker-core.js の poker.core.getHandCategory がこれから実装するファンクションです。  
最初の [poker-core.js](src/main/js/poker-core.js) は以下のような実装になっています（ほとんど何もしていません）。

    poker.core.getHandCategory = function() {
      return poker.handCategory.HIGH_CARD;
    }

が、いきなり poker-core.js を修正するのではなく、
まず、[poker-coreTest.html](src/test/resources/poker-coreTest.html) をブラウザで開いてください。  
poker-coreTest.html を開くと、[poker-coreTest.js](src/test/js/poker-coreTest.js)
に記述されたユニットテストが実行されます。
（ほとんどのテストケースがエラーになることが確認できると思います）。

次に、[poker-coreTest.js](src/test/js/poker-coreTest.js) をテキストエディタで開いてみてください。
poker-coreTest.js は [QUnit](http://qunitjs.com/) の形式で書かれていますが、
QUnit のことを知らなくても、
このコードを見れば、「ここで何をテストしようとしているのか」と
「poker.core.getHandCategory の仕様」は理解できると思います。

さてこれで準備は完了です。

あとは、

1. poker-core.js を少し修正する。
2. poker-coreTest.html をリロードしてテスト結果を確認する。

を繰り返しながら、すべてのテストがOKになることを目指しましょう！
