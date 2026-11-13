// ===================================
// Mellow Café
// ゲームの設定
// ===================================

const $ = id => document.getElementById(id);

// ドリンクのレシピ（材料2個の定番 ＋ 材料3〜4個の特別メニュー）
const recipes = [
  // --- 材料2個（EASY / NORMAL用） ---
  {
    name: "カフェラテ",
    character: "bear",
    needs: ["coffee", "milk"],
    jp: "コーヒー＋ミルク"
  },
  {
    name: "ストロベリーミルク",
    character: "bunny",
    needs: ["strawberry", "milk"],
    jp: "いちご＋ミルク"
  },
  {
    name: "抹茶ラテ",
    character: "panda",
    needs: ["matcha", "milk"],
    jp: "抹茶＋ミルク"
  },
  {
    name: "チョコアイス",
    character: "cat",
    needs: ["chocolate", "ice"],
    jp: "チョコ＋氷"
  },
  {
    name: "アイスコーヒー",
    character: "panda",
    needs: ["coffee", "ice"],
    jp: "コーヒー＋氷"
  },
  {
    name: "レモンティー",
    character: "bunny",
    needs: ["tea", "lemon"],
    jp: "紅茶＋レモン"
  },
  {
    name: "ハニーミルク",
    character: "bear",
    needs: ["milk", "honey"],
    jp: "ミルク＋はちみつ"
  },
  {
    name: "ミルクティー",
    character: "cat",
    needs: ["tea", "milk"],
    jp: "紅茶＋ミルク"
  },
  {
    name: "チョコミルク",
    character: "bear",
    needs: ["chocolate", "milk"],
    jp: "チョコ＋ミルク"
  },

  // --- 材料3〜4個（HARD専用の難しい注文） ---
  {
    name: "アイスカフェラテ",
    character: "bear",
    needs: ["coffee", "milk", "ice"],
    jp: "コーヒー＋ミルク＋氷"
  },
  {
    name: "カフェモカ",
    character: "cat",
    needs: ["coffee", "milk", "chocolate"],
    jp: "コーヒー＋ミルク＋チョコ"
  },
  {
    name: "ハニーカフェラテ",
    character: "bear",
    needs: ["coffee", "milk", "honey"],
    jp: "コーヒー＋ミルク＋はちみつ"
  },
  {
    name: "アイス抹茶ラテ",
    character: "panda",
    needs: ["matcha", "milk", "ice"],
    jp: "抹茶＋ミルク＋氷"
  },
  {
    name: "抹茶チョコフラッペ",
    character: "panda",
    needs: ["matcha", "chocolate", "ice"],
    jp: "抹茶＋チョコ＋氷"
  },
  {
    name: "アイスいちごミルク",
    character: "bunny",
    needs: ["strawberry", "milk", "ice"],
    jp: "いちご＋ミルク＋氷"
  },
  {
    name: "ストロベリーチョコミルク",
    character: "bunny",
    needs: ["strawberry", "milk", "chocolate"],
    jp: "いちご＋ミルク＋チョコ"
  },
  {
    name: "アイスミルクティー",
    character: "cat",
    needs: ["tea", "milk", "ice"],
    jp: "紅茶＋ミルク＋氷"
  },
  {
    name: "ハニーミルクティー",
    character: "bunny",
    needs: ["tea", "milk", "honey"],
    jp: "紅茶＋ミルク＋はちみつ"
  },
  {
    name: "アイスレモンティー",
    character: "panda",
    needs: ["tea", "lemon", "ice"],
    jp: "紅茶＋レモン＋氷"
  },
  {
    name: "ハニーレモンティー",
    character: "bunny",
    needs: ["tea", "lemon", "honey"],
    jp: "紅茶＋レモン＋はちみつ"
  },
  {
    name: "はちみつレモンアイス",
    character: "cat",
    needs: ["honey", "lemon", "ice"],
    jp: "はちみつ＋レモン＋氷"
  },
  {
    name: "スペシャルモカフラッペ",
    character: "bear",
    needs: ["coffee", "milk", "chocolate", "ice"],
    jp: "コーヒー＋ミルク＋チョコ＋氷"
  },
  {
    name: "ベリーショコラフラッペ",
    character: "cat",
    needs: ["strawberry", "milk", "chocolate", "ice"],
    jp: "いちご＋ミルク＋チョコ＋氷"
  }
];

// 難易度ごとのルール設定
const difficultySettings = {
  easy: {
    label: "EASY",
    time: 15,
    hint: true,
    reward: 1,
    minNeeds: 2,
    maxNeeds: 2
  },
  normal: {
    label: "NORMAL",
    time: 10,
    hint: false,
    reward: 2,
    minNeeds: 2,
    maxNeeds: 2
  },
  hard: {
    label: "HARD",
    time: 8,
    hint: false,
    reward: 3,
    minNeeds: 3,
    maxNeeds: 4
  }
};

let currentDifficulty = "normal";

// ===================================
// 材料
// ===================================

const ingredientData = {
  coffee: { name: "コーヒー", emoji: "☕" },
  milk: { name: "ミルク", emoji: "🥛" },
  strawberry: { name: "いちご", emoji: "🍓" },
  matcha: { name: "抹茶", emoji: "🍵" },
  chocolate: { name: "チョコ", emoji: "🍫" },
  ice: { name: "氷", emoji: "🧊" },
  tea: { name: "紅茶", emoji: "🫖" },
  honey: { name: "はちみつ", emoji: "🍯" },
  lemon: { name: "レモン", emoji: "🍋" }
};

// ===================================
// お店で購入できるアイテム
// ===================================

const itemData = {
  flower: {
    img: "item_flower.png",
    emoji: "🌷",
    name: "お花",
    cost: 4
  },
  lamp: {
    img: "item_lamp.png",
    emoji: "🪔",
    name: "ランプ",
    cost: 6
  },
  cat: {
    img: "item_cat.png",
    emoji: "🐈",
    name: "ねこ店員",
    cost: 8
  },
  cake: {
    img: "item_cake.png",
    emoji: "🍰",
    name: "ケーキ棚",
    cost: 10
  }
};

// ===================================
// ゲームデータ・セーブ
// ===================================

let state;

try {
  state = JSON.parse(
    localStorage.getItem("littlePixelCafe") || "null"
  );
} catch (error) {
  state = null;
}

if (
  !state ||
  typeof state !== "object" ||
  !Array.isArray(state.owned)
) {
  state = {
    points: 0,
    day: 1,
    happy: 0,
    served: 0,
    owned: [],
    equipped: []
  };
}

if (state.points === undefined) {
  state.points = 0;
}

if (state.coins !== undefined) {
  state.points = Math.floor(state.coins / 5);
  delete state.coins;
}

state.day = state.day || 1;
state.happy = state.happy || 0;
state.served = state.served || 0;

if (!Array.isArray(state.equipped)) {
  state.equipped = [...state.owned];
}

let selected = [];
let current = null;
let finished = false;

// カウントダウン設定
let timeLeft = 10;
let countdownInterval = null;

// タイマー表示
function updateTimer() {
  if ($("timer")) {
    $("timer").textContent = timeLeft;
  }

  const timerBox = document.querySelector(".timer");
  if (timerBox) {
    timerBox.classList.toggle("warning", timeLeft <= 3);
  }
}

// タイマー開始
function startCountdown() {
  clearInterval(countdownInterval);

  const config = difficultySettings[currentDifficulty] || difficultySettings.normal;
  timeLeft = config.time;
  updateTimer();

  countdownInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      timeUp();
    }
  }, 1000);
}

// 時間切れ
function timeUp() {
  current = null;

  if ($("message")) {
    $("message").textContent = "時間切れ！次のお客さんを迎えよう！";
  }

  if ($("orderText")) {
    $("orderText").textContent = "ドリンクが間に合わなかったみたい...";
  }

  document.querySelectorAll(".ingredient").forEach(btn => {
    btn.disabled = true;
  });

  if ($("serve")) {
    $("serve").disabled = true;
  }

  setTimeout(() => {
    if ($("serve")) {
      $("serve").disabled = false;
    }
    newOrder();
  }, 1500);
}

// ===================================
// セーブ機能
// ===================================

function save() {
  localStorage.setItem(
    "littlePixelCafe",
    JSON.stringify(state)
  );
}

// ===================================
// お客さんの画像
// ===================================

function showCustomer(happy) {
  const customer = $("customer");
  if (!customer || !current) return;

  const characterMap = {
    bear: { img: "bear.png", emoji: "🐻" },
    bunny: { img: "bunny.png", emoji: "🐰" },
    cat: { img: "cat.png", emoji: "🐱" },
    panda: { img: "panda.png", emoji: "🐼" }
  };

  const data = characterMap[current.character] || { img: "bear.png", emoji: "🐻" };
  const className = happy ? "customer-happy" : "customer-image";

  customer.innerHTML = "";
  const img = document.createElement("img");
  img.src = data.img;
  img.alt = current.character;
  img.className = className;
  img.onerror = () => {
    customer.textContent = happy ? "🥰" : data.emoji;
  };
  customer.appendChild(img);
}

// ===================================
// 材料ボタンを自動で作る
// ===================================

function createIngredients() {
  const container = $("ingredients");
  if (!container) return;

  container.innerHTML = "";

  Object.entries(ingredientData).forEach(([key, item]) => {
    const button = document.createElement("button");
    button.className = "ingredient";
    button.dataset.value = key;
    button.innerHTML = `${item.emoji}<br>${item.name}`;

    button.addEventListener("click", () => {
      if (finished || !current) return;

      if (selected.includes(key)) {
        selected = selected.filter(x => x !== key);
        button.classList.remove("selected");
      } else {
        selected.push(key);
        button.classList.add("selected");
      }
    });

    container.appendChild(button);
  });
}

// ===================================
// ショップを自動で作る
// ===================================

function createShop() {
  const container = $("shopItems");
  if (!container) return;

  container.innerHTML = "";

  Object.entries(itemData).forEach(([key, item]) => {
    const button = document.createElement("button");
    button.className = "item";
    button.dataset.item = key;
    button.dataset.cost = item.cost;

    button.addEventListener("click", () => {
      buyItem(key);
    });

    container.appendChild(button);
  });
}

// ===================================
// 画面の更新
// ===================================

function update() {
  if ($("coins")) $("coins").textContent = state.points;
  if ($("day")) $("day").textContent = state.day;
  if ($("happy")) $("happy").textContent = state.happy;

  const pointLabel = $("pointLabel");
  if (pointLabel) {
    pointLabel.textContent = "POINT";
  }

  // 飾っている数に応じてゲージを更新
  if ($("progressBar")) {
    $("progressBar").style.width =
      (state.equipped.length / 4 * 100) + "%";
  }

  if ($("growthText")) {
    $("growthText").textContent =
      state.equipped.length === 4
        ? "Mellow Caféが完成したよ！♡"
        : `飾りつけ中 ${state.equipped.length}/4 個`;
  }

  // お花の表示（飾っているときはお花画像、外すと植木鉢に戻る）
  const scenePlant = $("scenePlant");
  if (scenePlant) {
    if (state.equipped.includes("flower")) {
      scenePlant.innerHTML = "";
      const plantImg = document.createElement("img");
      plantImg.src = "item_flower.png";
      plantImg.alt = "お花";
      plantImg.className = "scene-plant-img";
      plantImg.onerror = () => {
        scenePlant.textContent = "🌷";
      };
      scenePlant.appendChild(plantImg);
    } else {
      scenePlant.textContent = "🪴";
    }
  }

  // ショップボタンの状態更新（購入済みならクリックで着脱可能）
  Object.entries(itemData).forEach(([key, item]) => {
    const button = document.querySelector(
      `#shopItems button[data-item="${key}"]`
    );

    if (!button) return;

    const owned = state.owned.includes(key);
    const equipped = state.equipped.includes(key);

    button.classList.toggle("owned", owned && equipped);
    button.classList.toggle("stored", owned && !equipped);
    button.disabled = !owned && state.points < item.cost;

    button.innerHTML = "";

    const icon = document.createElement("img");
    icon.src = item.img;
    icon.alt = item.name;
    icon.className = "item-icon";
    icon.onerror = () => {
      const span = document.createElement("span");
      span.textContent = item.emoji;
      icon.replaceWith(span);
    };

    let statusText = `${item.cost} POINT`;
    if (owned && equipped) {
      statusText = "飾り中（外す）";
    } else if (owned && !equipped) {
      statusText = "外し中（飾る）";
    }

    button.appendChild(icon);
    button.appendChild(document.createTextNode(item.name));
    button.appendChild(document.createElement("br"));
    button.appendChild(document.createTextNode(statusText));
  });

  // レジ台の上には「飾り中」のアイテムだけを表示
  const decorations = $("sceneDecorations");
  if (decorations) {
    decorations.innerHTML = "";

    state.equipped.forEach(key => {
      const item = itemData[key];
      if (item) {
        const decoration = document.createElement("img");
        decoration.className = "decoration-img";
        decoration.dataset.item = key;
        decoration.src = item.img;
        decoration.alt = item.name;
        decoration.title = item.name;
        decoration.onerror = () => {
          const span = document.createElement("span");
          span.textContent = item.emoji;
          span.title = item.name;
          decoration.replaceWith(span);
        };
        decorations.appendChild(decoration);
      }
    });
  }

  save();
}

// ===================================
// 新しい注文
// ===================================

function newOrder() {
  const config = difficultySettings[currentDifficulty] || difficultySettings.normal;
  const minNeeds = config.minNeeds || 2;
  const maxNeeds = config.maxNeeds || 2;

  let availableRecipes = recipes.filter(
    r => r.needs.length >= minNeeds && r.needs.length <= maxNeeds
  );

  if (availableRecipes.length === 0) {
    availableRecipes = recipes;
  }

  current = availableRecipes[
    Math.floor(Math.random() * availableRecipes.length)
  ];

  selected = [];
  finished = false;

  document.querySelectorAll(".ingredient").forEach(btn => {
    btn.classList.remove("selected");
    btn.disabled = false;
  });

  showCustomer(false);

  if ($("orderText")) {
    if (config.hint) {
      $("orderText").innerHTML = `
        「<b>${current.name}</b>をひとつお願いします！」<br>
        <span style="font-size:12px;color:#9c586e;">💡 ヒント：${current.jp}</span>
      `;
    } else {
      $("orderText").innerHTML = `「<b>${current.name}</b>をひとつお願いします！」`;
    }
  }

  if ($("message")) {
    $("message").textContent = "材料を選んでドリンクを作ろう！";
  }

  if ($("serve")) {
    $("serve").textContent = "できあがり！ ✧";
    $("serve").disabled = false;
  }

  startCountdown();
}

// ===================================
// やりなおしボタン
// ===================================

if ($("clear")) {
  $("clear").addEventListener("click", () => {
    if (finished) return;

    selected = [];

    document.querySelectorAll(".ingredient").forEach(btn => {
      btn.classList.remove("selected");
    });

    if ($("message")) {
      $("message").textContent = "材料を選びなおしてね。";
    }
  });
}

// ===================================
// ドリンクを完成させる・NEXT
// ===================================

if ($("serve")) {
  $("serve").addEventListener("click", () => {
    if (finished) {
      newOrder();
      return;
    }

    if (!current) return;

    const correct =
      selected.length === current.needs.length &&
      current.needs.every(x => selected.includes(x));

    if (correct) {
      clearInterval(countdownInterval);

      const config = difficultySettings[currentDifficulty] || difficultySettings.normal;
      const reward = config.reward;

      state.points += reward;
      state.happy += 1;
      state.served += 1;

      finished = true;

      if ($("message")) {
        $("message").textContent =
          `大正解！おいしい〜！ +${reward} POINT ♡`;
      }

      if ($("orderText")) {
        $("orderText").textContent =
          `${current.name} が完成！お客さんが笑顔になったよ。`;
      }

      showCustomer(true);

      document.querySelectorAll(".ingredient").forEach(btn => {
        btn.disabled = true;
      });

      $("serve").textContent = "NEXT ▶";

      if (state.served % 5 === 0) {
        state.day += 1;
        if ($("message")) {
          $("message").textContent += " 新しい一日が始まったよ！";
        }
      }

      update();
    } else {
      if ($("message")) {
        $("message").textContent =
          "あれれ？材料がちがうみたい。もう一度！";
      }
    }
  });
}

// ===================================
// アイテム購入・取り外し切り替え
// ===================================

function buyItem(key) {
  const item = itemData[key];
  if (!item) return;

  // すでに購入済みの場合は「取り外す / 飾る」を切り替え
  if (state.owned.includes(key)) {
    if (state.equipped.includes(key)) {
      state.equipped = state.equipped.filter(x => x !== key);
      if ($("message")) {
        $("message").textContent = `${item.name}を取り外したよ。`;
      }
    } else {
      state.equipped.push(key);
      if ($("message")) {
        $("message").textContent = `${item.name}をまた飾ったよ！ ✿`;
      }
    }
    update();
    return;
  }

  // 未購入の場合はポイントで購入して飾る
  if (state.points < item.cost) {
    return;
  }

  state.points -= item.cost;
  state.owned.push(key);
  state.equipped.push(key);

  if ($("message")) {
    $("message").textContent =
      `${item.name}を購入して飾ったよ！お店がかわいくなったね ✿`;
  }

  update();
}

// ===================================
// ホーム画面・難易度選択の操作
// ===================================

document.querySelectorAll(".diff-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".diff-btn").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    currentDifficulty = btn.dataset.diff;
  });
});

if ($("startBtn")) {
  $("startBtn").addEventListener("click", () => {
    if ($("homeScreen")) {
      $("homeScreen").classList.add("hidden");
    }
    newOrder();
  });
}

if ($("homeBtn")) {
  $("homeBtn").addEventListener("click", () => {
    clearInterval(countdownInterval);
    current = null;
    if ($("homeScreen")) {
      $("homeScreen").classList.remove("hidden");
    }
  });
}

// ===================================
// ゲームスタート（初期準備）
// ===================================

createIngredients();
createShop();
update();