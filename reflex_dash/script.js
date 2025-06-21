/* Falling arrow rhythm */
const arrows=["left","up","down","right"];
const zone=document.getElementById("gameArea"),info=document.getElementById("info");
let score=0,lives=3,interval;
startBtn.onclick=start;
function start(){
  zone.innerHTML="";score=0;lives=3;info.textContent="Score:0  Lives:3";
  clearInterval(interval);
  interval=setInterval(spawn,1200);
}
function spawn(){
  const dir=arrows[Math.floor(Math.random()*4)];
  const el=document.createElement("div");
  el.className="arrow "+dir;el.textContent=dir[0].toUpperCase();
  zone.appendChild(el);
  let top=0;
  const fall=setInterval(()=>{
    top+=5;el.style.top=top+"px";
    if(top>120){zone.removeChild(el);loseLife();clearInterval(fall);}
  },30);
}
function loseLife(){
  lives--;info.textContent=`Score:${score}  Lives:${lives}`;
  if(lives===0){clearInterval(interval);alert("Game over!");}
}
document.addEventListener("keydown",e=>{
  const key=e.key;
  const first=zone.querySelector(".arrow");
  if(!first)return;
  const want={"ArrowLeft":"left","ArrowRight":"right","ArrowUp":"up","ArrowDown":"down"}[key];
  if(want && first.classList.contains(want) && parseInt(first.style.top)<120){
    score++;info.textContent=`Score:${score}  Lives:${lives}`;
    zone.removeChild(first);
  }else if(want){
    loseLife();
  }
});
