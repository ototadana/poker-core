DevNomi 2014 実況用環境
=======================
DevNomi 2014 実況用の環境です。


必須ソフトウェア
----------------
*   node.js
*   bower
*   grunt

利用方法
--------
1.  このフォルダに `cd` する。
2.  `npm install`  を実行する（node_modules に grunt 実行に必要なライブラリがインストールされる）。
3.  `bower install` を実行する（bower_components に jquery と qunit がインストールされる）。
4.  `grunt` をオプション無しで実行する（実行するとブラウザ上にテスト結果が表示される）。
5.  テキストエディタで `src/porker-core.js` を修正する（保存すると自動的にテストが再実行される）。
