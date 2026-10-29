// 宣告全局變數：儲存走路與跳躍的 Sprite Sheet 圖片
let walkSpriteSheet;
let jumpSpriteSheet;

// 宣告角色相關狀態變數
let x; // 角色的 X 軸位置
let y; // 角色的 Y 軸位置
let speed = 5; // 角色的移動速度

// 影格動畫播放控制變數
let currentFrame = 0; // 目前播放到的影格索引 (0 ~ 7)
let animationSpeed = 0.2; // 動畫播放速度 (每幀增加的影格計數)
let facingRight = true; // 角色朝向：true 為朝右，false 為朝左

// 宣告影格總數與圖片切片尺寸變數
const totalFrames = 8; // 動畫共有 8 張影格

// 走路圖片尺寸資訊 (1107 x 198)
const walkTotalWidth = 1107;
const walkHeight = 198;
const walkFrameWidth = walkTotalWidth / totalFrames; // 單張走路影格寬度 ≈ 138.375

// 跳躍圖片尺寸資訊 (1091 x 182)
const jumpTotalWidth = 1091;
const jumpHeight = 182;
const jumpFrameWidth = jumpTotalWidth / totalFrames; // 單張跳躍影格寬度 ≈ 136.375

// p5.js 預載函數：在 setup() 執行前先載入資源檔
function preload() {
  // 載入走路 Sprite Sheet 圖片
  walkSpriteSheet = loadImage('1/走/走完整.png');
  // 載入跳躍 Sprite Sheet 圖片
  jumpSpriteSheet = loadImage('1/跳/跳完整.png');
}

// p5.js 初始化設定函數
function setup() {
  // 創建與視窗同等寬高的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定圖片繪製模式為中心點對齊 (方便轉向與旋擾計算)
  imageMode(CENTER);
  
  // 將角色的初始位置設定在畫布正中央
  x = width / 2;
  y = height / 2;
}

// p5.js 主重複繪製循環函數 (預設每秒執行約 60 次)
function draw() {
  // 每一幀重新繪製背景，填充指定顏色 #a2d2ff
  background('#a2d2ff');
  
  // 判斷當前是否按下鍵盤按鍵
  let isMoving = false; // 紀錄角色目前是否處於移動狀態
  
  // 判斷是否按下右箭頭鍵
  if (keyIsDown(RIGHT_ARROW)) {
    x += speed; // 角色的 X 座標往右遞增
    facingRight = true; // 將角色方向設定為朝右
    isMoving = true; // 標記角色正在移動
  } 
  // 判斷是否按下左箭頭鍵
  else if (keyIsDown(LEFT_ARROW)) {
    x -= speed; // 角色的 X 座標往左遞減
    facingRight = false; // 將角色方向設定為朝左
    isMoving = true; // 標記角色正在移動
  }

  // 根據移動狀態選擇要繪製的動畫 Sprite Sheet 與對應尺寸
  let currentSheet; // 當前採用的 Sprite Sheet 圖片
  let frameW;       // 當前影格寬度
  let frameH;       // 當前影格高度

  if (isMoving) {
    // 若在移動中 (按下左或右鍵)，使用跳躍動畫
    currentSheet = jumpSpriteSheet;
    frameW = jumpFrameWidth;
    frameH = jumpHeight;
  } else {
    // 若靜止無按鍵，使用走路動畫
    currentSheet = walkSpriteSheet;
    frameW = walkFrameWidth;
    frameH = walkHeight;
  }

  // 更新影格播放計數 (循環播放 0 到 7 影格)
  currentFrame = (currentFrame + animationSpeed) % totalFrames;
  
  // 計算當前影格在 Sprite Sheet 中的整數索引 (0 ~ 7)
  let frameIndex = floor(currentFrame);
  
  // 計算當前影格在 Sprite Sheet 上的 X 軸裁切起始位置
  let sx = frameIndex * frameW;

  // 保存當前的畫布變換矩陣狀態
  push();
  
  // 將畫布的原點移動到角色的當前座標 (x, y)
  translate(x, y);
  
  // 如果角色朝左，將畫布水平反轉 (X 軸乘以 -1)
  if (!facingRight) {
    scale(-1, 1);
  }

  // 繪製裁切後的精靈影格
  // 參數分別為：(圖片, 繪製位置X, 繪製位置Y, 繪製寬度, 繪製高度, 裁切X, 裁切Y, 裁切寬度, 裁切高度)
  image(
    currentSheet, 
    0, 0,          // 在當前原點 (0, 0) 繪製
    frameW, frameH, // 畫布上的顯示尺寸
    sx, 0,         // Sprite Sheet 上的裁切起始點
    frameW, frameH  // Sprite Sheet 上的裁切寬高
  );

  // 恢復先前保存的畫布變換矩陣狀態
  pop();
}

// 當使用者調整瀏覽器視窗大小時觸發此函數
function windowResized() {
  // 自動將畫布重新調整為新的視窗寬高，保持全螢幕效果
  resizeCanvas(windowWidth, windowHeight);
}