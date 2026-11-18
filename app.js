const $ = s => document.querySelector(s);
const rooms = {
 general:["A little bit of everything. Be decent to each other.",128],
 random:["Memes, side quests, and whatever else.",64],
 music:["Share tracks, artists, playlists, and discoveries.",42],
 gaming:["Games, teammates, tips, and friendly competition.",37],
 "late-night":["For the night owls and deep conversations.",19]
};
let nickname = localStorage.getItem("wac-name") || "Guest";
let currentRoom = "general";
const colors = ["purple","orange","blue","green","pink"];
function updateName(){ $("#profileBtn").innerHTML = `${escapeHtml(nickname)} <span>⌄</span>`; }
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function setRoom(room){
 currentRoom=room; $("#roomTitle").textContent=room; $("#roomDescription").textContent=rooms[room][0];
 $("#messageInput").placeholder=`Message #${room}…`;
 document.querySelectorAll(".room").forEach(b=>b.classList.toggle("active",b.dataset.room===room));
 $("#messages").innerHTML=`<div class="day-divider"><span>TODAY</span></div><div class="empty-state" style="text-align:center;color:#737b89;padding:55px 10px;font-size:12px">You’re in <b>#${escapeHtml(room)}</b>. Start the conversation.</div>`;
}
document.querySelectorAll(".room").forEach(b=>b.addEventListener("click",()=>setRoom(b.dataset.room)));
$("#messageForm").addEventListener("submit",e=>{
 e.preventDefault(); const input=$("#messageInput"), value=input.value.trim(); if(!value)return;
 const now=new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit"});
 const article=document.createElement("article"); article.className="message";
 const avatar=document.createElement("div"); avatar.className="avatar pink"; avatar.textContent=(nickname[0]||"G").toUpperCase();
 const body=document.createElement("div"); body.className="message-body";
 const meta=document.createElement("div"); meta.className="message-meta";
 const name=document.createElement("b"); name.textContent=nickname;
 const time=document.createElement("span"); time.textContent=now;
 const p=document.createElement("p"); p.textContent=value;
 meta.append(name,time); body.append(meta,p); article.append(avatar,body);
 $("#messages").append(article); $("#messages").scrollTop=$("#messages").scrollHeight;
 input.value=""; $("#charCount").textContent="0";
});
$("#messageInput").addEventListener("input",e=>$("#charCount").textContent=e.target.value.length);
$("#profileBtn").addEventListener("click",()=>$("#nameDialog").showModal());
$("#saveName").addEventListener("click",e=>{
 const value=$("#nickname").value.trim(); if(value){nickname=value;localStorage.setItem("wac-name",value);updateName();}
});
$("#nickname").value=nickname==="Guest"?"":nickname;
updateName();
$("#addRoom").addEventListener("click",()=>{
 const name=prompt("Name your new room (letters, numbers, hyphens):"); if(!name)return;
 const slug=name.toLowerCase().trim().replace(/[^a-z0-9-]+/g,"-").replace(/^-|-$/g,"").slice(0,24);
 if(!slug||rooms[slug])return;
 rooms[slug]=["A new community room.",1];
 const button=document.createElement("button");button.className="room";button.dataset.room=slug;
 button.innerHTML=`<span class="room-icon">#</span><span>${escapeHtml(slug)}</span>`;
 button.addEventListener("click",()=>setRoom(slug));$("#roomList").append(button);setRoom(slug);
});
$("#themeBtn").addEventListener("click",()=>{
 const light=document.body.dataset.theme!=="light";
 document.body.dataset.theme=light?"light":"dark";
 document.documentElement.style.colorScheme=light?"light":"dark";
 document.documentElement.style.setProperty("--bg",light?"#eef0f5":"#0e1014");
 document.documentElement.style.setProperty("--panel",light?"#fff":"#15181f");
 document.documentElement.style.setProperty("--panel2",light?"#f6f7fa":"#191d25");
 document.documentElement.style.setProperty("--line",light?"#d9dce5":"#292e38");
 document.documentElement.style.setProperty("--text",light?"#222632":"#edf0f6");
 document.querySelector(".chat-panel").style.background=light?"#fff":"#12151b";
});
