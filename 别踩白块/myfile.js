var clock = null;
var speed;
var score;

window.onload = function() {
  $(".start")[0].onclick = init;
}

function init() {
  score = 0;
  $(".score")[0].innerText = score;
  speed = 4;

  for (var i = 0; i < 4; i++) {
    createrow();
  }

  $('.window')[0].onclick = function(ev) {
    judge(ev);
  }

  clock = window.setInterval('move()', 30); //30ms调用一次move
}

function judge(ev) {
  if (ev.target.className.indexOf("black") != -1) {
    ev.target.className = "cell"; //变白
    addScore();
  }
}

function fail() {
  clearInterval(clock);
  $(".positioner")[0].innerHTML = ""; //相当于删除所有子节点
  alert("你的最终得分为: " + score);
}

function creatediv(name) {
  var div = document.createElement('div');
  div.className = name;
  return div;
}

function createrow() {
  var row = creatediv("row");
  var arr = createcell();
  var pos = $(".positioner")[0];

  for (var i = 0; i < 4; i++) {
    row.appendChild(creatediv(arr[i]));
  }

  if (pos.firstChild == null) {
    pos.appendChild(row);
  } else {
    pos.insertBefore(row, pos.firstChild);
  }
}

function deleterow() {
  var pos = $(".positioner")[0];
  if (pos.childNodes.length == 6) {
    pos.removeChild(pos.lastChild);
  }
}

function createcell() {
  var tem = ["cell", "cell", "cell", "cell"];
  var i = Math.floor(Math.random() * 4);
  tem[i] = "cell black";
  return tem;
}

function speedup() {
  speed += 2;
  if (speed == 20) {
    alert('你超神了');
  }
}

function move() {
  var pos = $(".positioner")[0];
  var top = parseInt(window.getComputedStyle(pos, null)['top']);

  if (top + speed > 0) {
    top = 0;
  } else {
    top += speed;
  }
  pos.style.top = top + "px";

  if (top == 0) {
    createrow();
    pos.style.top = "-100px";
    deleterow();
  } else if (top == (-100 + speed)) { //碰到底下
    var row = pos.lastChild.childNodes;
    for (var i = 0; i < row.length; i++) {
      if (row[i].className != "cell") {
        fail();
      }
    }
  }
}

function addScore() {
  score++;
  $(".score")[0].innerText = score;
  if (score % 10 == 0) {
    speedup();
  }
}
