let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
document.getElementById("start").onclick = function () {
  let name = document.getElementById("text").value;
  let player = document.getElementById("player");
  if (name == null || name == "") {
    player.innerHTML = `anonymous`;
  } else {
    player.innerHTML = name;
  }
  document.getElementById("btns").remove();

  blocks.forEach((e) => {
    e.classList.add("is-flipped");
    setTimeout(() => {
      e.classList.remove("is-flipped");
    }, 3000);
  });
};
let duration = 1000;
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
blocks.forEach((element, i) => {
  element.style.order = orderRange[i];
  element.addEventListener("click", function () {
    flip(element);
    flippedblocks1 = blocks.filter((e) => e.classList.contains("has-match"));
    if (flippedblocks1.length == blocks.length) {
      end();
    }
  });
});

function flip(e) {
  e.classList.add("is-flipped");

  flippedblocks = blocks.filter((e) => e.classList.contains("is-flipped"));
  if (flippedblocks.length == 2) {
    noClicking();
    matchedBlocks(flippedblocks[0], flippedblocks[1]);
  }
}

function matchedBlocks(one, two) {
  let tries = document.querySelector(".info-container .tries span");

  if (one.dataset.technology == two.dataset.technology) {
    one.classList.remove("is-flipped");
    two.classList.remove("is-flipped");

    one.classList.add("has-match");
    two.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    if (tries.innerHTML == 12) {
      end();
    }
    setTimeout(() => {
      one.classList.remove("is-flipped");
      two.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

function end() {
  document.getElementById("end1").style.display = "block";

  setTimeout(() => {
    location.reload();
  }, 2000);
}

function noClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function shuffle(array) {
  let current = array.length;

  while (current > 0) {
    let random = Math.floor(Math.random() * current);

    current--;
    [array[current], array[random]] = [array[random], array[current]];
  }
}
