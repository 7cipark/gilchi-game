const $=id=>document.getElementById(id);
function load(k,d){try{return localStorage.getItem(k)??d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,v)}catch(e){}}
let fs=parseInt(load("fs_all","28"));document.documentElement.style.setProperty("--fs",fs+"px");
function setFs(d){fs=Math.min(38,Math.max(22,fs+d));document.documentElement.style.setProperty("--fs",fs+"px");save("fs_all",fs)}
let sound=load("snd_all","1")==="1",AC=null,MG=null;
function tone(f,t0,d,type,vol){try{if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();const c=AC.createDynamicsCompressor();c.threshold.value=-10;c.ratio.value=8;const m=AC.createGain();m.gain.value=1.6;c.connect(m);m.connect(AC.destination);MG=c}if(AC.state==="suspended")AC.resume();const o=AC.createOscillator(),g=AC.createGain();o.type=type||"sine";o.frequency.value=f;o.connect(g);g.connect(MG);const s=AC.currentTime+t0;g.gain.setValueAtTime(0.0001,s);g.gain.exponentialRampToValueAtTime(vol||0.4,s+0.015);g.gain.exponentialRampToValueAtTime(0.0001,s+d);o.start(s);o.stop(s+d+0.05)}catch(e){}}
function bell(f,t0,d,v){tone(f,t0,d,"sine",v);tone(f*2,t0,d*.7,"sine",v*.4);tone(f*3,t0,d*.4,"sine",v*.15)}
function sfx(k){if(!sound)return;
  if(k==="ok"){bell(1319,0,.55,.5);bell(1047,.38,.55,.5);bell(1568,.76,1.0,.55)}
  else if(k==="bad"){tone(150,0,.7,"sawtooth",.45);tone(158,0,.7,"square",.25)}
  else if(k==="click")tone(700,0,.08,"square",.14);
  else if(k==="flip")tone(620,0,.07,"square",.12);
  else if(k==="pair"){bell(1175,0,.3,.45);bell(1568,.15,.5,.5)}
  else if(k==="hit"){tone(300,0,.1,"square",.35);tone(500,.05,.12,"triangle",.3)}
  else if(k==="eat"){bell(988,0,.25,.45);bell(1319,.12,.35,.45)}
  else if(k==="start"){bell(523,0,.3,.45);bell(659,.14,.3,.45);bell(784,.28,.6,.5)}
  else if(k==="win"){[523,659,784,1047,784,1047,1319].forEach((f,i)=>bell(f,i*.17,.45,.55))}
  else if(k==="fin"){bell(523,0,.35,.45);bell(659,.22,.35,.45);bell(784,.44,.7,.5)}}
function initTools(){const s=$("snd");s.textContent=sound?"소리 켜짐":"소리 꺼짐";
  $("fm").onclick=()=>setFs(-3);$("fp").onclick=()=>setFs(3);
  s.onclick=()=>{sound=!sound;save("snd_all",sound?"1":"0");s.textContent=sound?"소리 켜짐":"소리 꺼짐";sfx("click")}}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function tools(title){return '<header><h1>'+title+'</h1><div class="tools"><button id="fm">가-</button><button id="fp">가+</button><button id="snd">소리 켜짐</button></div></header>'}
