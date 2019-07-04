enchant();

window.onload = function(){
    var game = new Game(320, 320);
    game.fps = 10;
    game.preload('img/chara0.png', 'img/map2.png', 'img/start.png', 'img/gameover.png', 'img/icon0.png');
    game.onload = function(){
        var createStartScene = function(){
            var scene = new Scene();

            //背景
            scene.backgroundColor = '#fcc800';

            //スタート画像の表示
            var startImage = new Sprite(236, 48);
            startImage.image = game.assets['img/start.png'];
            startImage.x = 42;
            startImage.y = 136;
            scene.addChild(startImage);

            //タイトルの表示
            var title = new Label('EXPLORER');
            title.textAlign = 'center';
            title.color = '#ffffff';
            title.x = 0;
            title.y = 96;
            title.font = '28px sans-serif';
            scene.addChild(title);

            //タッチでゲームスタート処理
            startImage.addEventListener(Event.TOUCH_START, function(e){
                game.replaceScene(createGameScene());
            });

            return scene;
        }

        var createGameScene = function(){
            var scene = new Scene();
            scene.backgroundColor = '#fcc8f0';

            //必要な変数の初期化
            var energy = 10;
            var speed = 32;

            //プレイヤーの作成/表示
            var player = new Sprite(32, 32);
            player.image = game.assets['img/chara0.png'];
            player.frame = 6;
            player.x = Math.random() * 288;
            player.y = Math.random() * 288;
            scene.addChild(player);

            //ストロベリーの作成/表示
            var strawberry = new Sprite(16, 16);
            strawberry.image = game.assets['img/icon0.png'];
            strawberry.frame = 32;
            strawberry.x = Math.random() * 300;
            strawberry.y = Math.random() * 300;
            scene.addChild(strawberry);

            //残エネルギーの表示
            var stepLimit = new Label('ENERGY ' + energy);
            stepLimit.font = '14px sans-serif';
            stepLimit.x = 0;
            stepLimit.y = 20;
            scene.addChild(stepLimit);

            //フレームごとの動き
            player.addEventListener(Event.ENTER_FRAME, function() {
                //キーボード入力に対する動き
                var input = game.input;
                if(input.left){this.x -= speed;energy--}
                if(input.right){this.x += speed;energy--}
                if(input.up){this.y -= speed;energy--}
                if(input.down){this.y += speed;energy--}

                //衝突判定
                if(player.intersect(strawberry)){
                    energy += 5;
                    strawberry.x = Math.random() * 300;
                    strawberry.y = Math.random() * 300;
                }

                //残エネルギーの更新
                stepLimit.text = 'ENERGY ' + energy;

                //ゲームオーバー判定/処理
                if(energy <= 0){game.replaceScene(createGameoverScene())}
            });
            return scene;

        }

        var createGameoverScene = function(){
            var scene = new Scene();

            //背景
            scene.backgroundColor = '#303030';

            //ゲームオーバー画像の表示
            var gameoverImage = new Sprite(189, 97);
            gameoverImage.image = game.assets['img/gameover.png'];
            gameoverImage.x = 65;
            gameoverImage.y = 112;
            scene.addChild(gameoverImage);

            //もう一度遊ぶの表示
            var retryLabel = new Label('もう一度遊ぶ');
            retryLabel.color = '#fff';
            retryLabel.x = 0;
            retryLabel.y = 300;
            retryLabel.font = '20px sans-serif';
            scene.addChild(retryLabel);

            //もう一度遊ぶ処理
            retryLabel.addEventListener(Event.TOUCH_START, function(e){
                game.replaceScene(createStartScene());
            });

            return scene;
        }
        //初めにスタートシーンの表示
        game.replaceScene(createStartScene());
    };
    game.start();
}