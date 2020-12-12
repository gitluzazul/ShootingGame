/***************************************************************************/
// グローバル変数定義
/***************************************************************************/
// 戦闘機のスプライト
var fighter;
// 戦闘機の画像
var fighterImage;
// 戦闘機の移動速度
var moveSpeed = 5;

// 攻撃のスプライト
var spark;
// 攻撃の画像
var sparkImage;
// 攻撃のクールタイム
var counter = 0;
var coolTime = 30;

// 敵のスプライト
var enemy;
// 敵のアニメーション
var enemyMoveAnimation;
// 敵倒すアニメーション
var enemyKillAnimation;
// 敵グループ
var enemyGroup

function preload(){
    // 戦闘機読み込み
    fighterImage = loadImage('../img/sentouki1.png');
    // 攻撃読み込み
    sparkImage = loadImage('../img/spark_01.png');
    // 敵アニメーション読み込み
    enemyMoveAnimation = loadAnimation('../img/enemy_santa_01.png', '../img/enemy_santa_04.png');
    enemyMoveAnimation.frameDelay = 20;
    // 敵倒すアニメーション読み込み
    enemyKillAnimation = loadAnimation('../img/kill_01.png', '../img/kill_11.png');
    enemyKillAnimation.looping = false;
}

function setup(){
    // キャンバス作成
    createCanvas(650, 600);
    // スプライト作成
    fighter = createSprite(300, 300);
    fighter.addImage(fighterImage);
    fighter.scale = 0.1;

    enemyGroup = new Group();
    // スプライト作成
    for(var i = 0; i < 8; i++){
        var x = random(10, 650);
        // 敵のスプライト
        enemy = createSprite(x,-10);
        // スプライトにアニメーションをつける
        enemy.addAnimation('move', enemyMoveAnimation);
        // サイズ調整
        enemy.scale = 1;
        // グループにスプライトを追加
        enemyGroup.add(enemy);
    }

}

function draw(){
    // キャンバスの背景色設定
    background(0);
    // スプライト表示
    drawSprites();
    // 敵の動き
    enemy.position.y += 1;
    // 戦闘機の操作
    fighterControl();

    // 衝突
//    fighter.overlap(enemyGroup, enemyKill);
}

// 戦闘機の操作
function fighterControl(){
    if(keyDown('SPACE')){
        // スペースを押したときの攻撃
        if(counter == 0){
            // カウンターが0なら撃つ
            spark = createSprite(fighter.position.x, fighter.position.y - 10);
            spark.addImage(sparkImage);
            spark.scale = 0.1;
            spark.velocity.y = fighter.velocity.y - 5;
            // カウンターを30にする
            counter = coolTime;
        }
    }
    if(counter > 0){
        // カウンターを減らしていく
        counter--;
    }
    
    if(spark != null){
        // 攻撃衝突処理
        spark.overlap(enemyGroup, enemyKill);
    }

    if(keyDown('RIGHT')){
        // 右矢印を押したときの移動
        fighter.position.x += moveSpeed;
    }
    if(keyDown('LEFT')){
        // 左矢印を押したときの移動
        fighter.position.x += -moveSpeed;
    }
    if(keyDown('UP')){
        // 上矢印を押したときの移動
        fighter.position.y += -moveSpeed;
    }
    if(keyDown('DOWN')){
        // 下矢印を押したときの移動
        fighter.position.y += moveSpeed;
    }
    
    // スプライトがキャンバス外に出ないようにする
    if(fighter.position.x > width - 30){
        // x座標を横幅-30にする
        fighter.position.x = width - 30;
    }
    if(fighter.position.x < 30){
        // x座標を30にする
        fighter.position.x = 30;
    }
    if(fighter.position.y < 30){
        // x座標を30にする
        fighter.position.y = 30;
    }
    if(fighter.position.y > height - 30){
        // x座標を高さ-30にする
        fighter.position.y = height - 30;
    }
}

// 衝突処理
function enemyKill(spark, enemy){
    // 消える敵のスプライトを作る
    var killEnemy = createSprite(enemy.position.x, enemy.position.y);
    // アニメーション読み込み
    killEnemy.addAnimation('kill', enemyKillAnimation);
    killEnemy.scale = 0.2;
    // 敵スプライトを消す
    enemy.remove();
    // 攻撃のスプライトを消す
    spark.remove();
}