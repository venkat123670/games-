/* Mind Flip – Simon‑style memory + reflex */
const tiles = ["red","blue","green","yellow"];
let sequence = [];
let userPos = 0;
let level = 0;
const area = document.getElementById("gameArea");
const info = document.getElementById("info");
const btn = document.getElementById("startBtn");

btn.onclick = startGame;

/* Create 4 coloured pads */
tiles.forEach(c=>{
  const el=document.createElement("div");
  el.className=`pad ${c}`;
  el.onclick=()=>handleClick(c);
  area.appendChild(el);
});

function flash(tile, i){
  setTimeout(()=>{
    document.querySelector(`.${tile}`).classList.add("active");
    setTimeout(()=>document.querySelector(`.${tile}`).classList.remove("active"),400);
  },600*i);
}

function playSeq(){
  sequence.forEach((t,i)=>flash(t,i));
}

function nextLevel(){
  level++;
  info.textContent=`Level ${level}`;
  sequence.push(tiles[Math.floor(Math.random()*4)]);
  userPos=0;
  setTimeout(playSeq,600);
}

function startGame(){
  sequence=[];level=0;
  info.textContent="Watch carefully…";
  nextLevel();
}

function handleClick(color){
  if(!sequence.length)return;
  if(color===sequence[userPos]){
    userPos++;
    if(userPos===sequence.length){
      info.textContent="Good! Next →";
      setTimeout(nextLevel,800);
    }
  }else{
    info.textContent=`❌ Wrong! You reached level ${level}. Click Start to retry.`;
    sequence.length=0;
  }
}
