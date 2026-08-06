/* ==========================================================
   NEXORA AI
   PREMIUM SCRIPT.JS — PART 1
========================================================== */

// Navbar
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(8,12,20,.92)";
        header.style.backdropFilter = "blur(25px)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
    } else {
        header.style.background = "rgba(8,12,20,.55)";
        header.style.boxShadow = "none";
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// Scroll Reveal

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.15});

document.querySelectorAll(
"section,.feature-card,.price-card,.testimonial,.use-card,.step,.stat"
).forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});

// Back To Top

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="flex";

topBtn.style.alignItems="center";

topBtn.style.justifyContent="center";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// Active Nav

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(sec=>{

const top=sec.offsetTop-120;

const height=sec.clientHeight;

if(pageYOffset>=top){

current=sec.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// Typing Effect

const typing=document.querySelector(".typing");

if(typing){

setInterval(()=>{

typing.style.opacity="0.4";

setTimeout(()=>{

typing.style.opacity="1";

},500);

},1000);

}

// Counter Animation

const counters=document.querySelectorAll(".stat h2");

let counted=false;

window.addEventListener("scroll",()=>{

if(counted) return;

const stats=document.querySelector(".stats");

if(!stats) return;

const trigger=stats.offsetTop-500;

if(window.scrollY>trigger){

counted=true;

counters.forEach(counter=>{

const text=counter.innerText;

const number=parseInt(text.replace(/\D/g,""))||0;

const suffix=text.replace(/[0-9]/g,"");

let value=0;

const step=Math.max(1,Math.ceil(number/80));

const timer=setInterval(()=>{

value+=step;

if(value>=number){

value=number;

clearInterval(timer);

}

counter.innerText=value+suffix;

},20);

});

}

});

console.log("✅ Nexora AI Premium Script Loaded");
/* ==========================================================
   NEXORA AI
   PREMIUM SCRIPT.JS — PART 2
   FAQ • Mouse Glow • Parallax • Ripple • Floating Cards
========================================================== */

// FAQ Accordion
document.querySelectorAll(".faq-item").forEach(item => {

    const title = item.querySelector("h3");
    const content = item.querySelector("p");

    if (!title || !content) return;

    content.style.display = "none";

    title.style.cursor = "pointer";

    title.addEventListener("click", () => {

        const open = content.style.display === "block";

        document.querySelectorAll(".faq-item p").forEach(p => {
            p.style.display = "none";
        });

        content.style.display = open ? "none" : "block";

    });

});

// Mouse Glow
const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "250px";
glow.style.height = "250px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background = "radial-gradient(circle, rgba(79,124,255,.18), transparent 70%)";
glow.style.filter = "blur(20px)";
glow.style.zIndex = "-1";

document.body.appendChild(glow);

document.addEventListener("mousemove", e => {

    glow.style.left = (e.clientX - 125) + "px";
    glow.style.top = (e.clientY - 125) + "px";

});

// Hero Parallax

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if(hero){

        hero.style.transform =
        `translateY(${window.scrollY*0.15}px)`;

    }

});

// Button Ripple

document.querySelectorAll(".primary-btn,.secondary-btn")
.forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.position="absolute";

ripple.style.borderRadius="50%";

ripple.style.background="rgba(255,255,255,.35)";

ripple.style.left=e.offsetX-size/2+"px";

ripple.style.top=e.offsetY-size/2+"px";

ripple.style.transform="scale(0)";

ripple.style.transition=".6s";

ripple.style.pointerEvents="none";

this.style.position="relative";

this.style.overflow="hidden";

this.appendChild(ripple);

requestAnimationFrame(()=>{

ripple.style.transform="scale(4)";
ripple.style.opacity="0";

});

setTimeout(()=>{

ripple.remove();

},600);

});

});

// Floating Cards

document.querySelectorAll(
".feature-card,.testimonial,.use-card,.price-card"
).forEach((card,index)=>{

setInterval(()=>{

card.style.transform=
`translateY(${Math.sin(Date.now()/1000+index)*5}px)`;

},40);

});

// Image Hover

document.querySelectorAll("img").forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.04)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

img.style.transition=".4s";

});

// Keyboard Shortcut

document.addEventListener("keydown",e=>{

if(e.key==="/"){

const input=document.querySelector("input");

if(input){

e.preventDefault();

input.focus();

}

}

});

console.log("✅ Nexora Premium JS Part 2 Loaded");
/* ==========================================================
   NEXORA AI
   PREMIUM SCRIPT.JS — PART 3
   Particles • Loader • Cursor • Mobile Menu
========================================================== */

// ================= LOADER =================

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},600);

}

});

// ================= PARTICLES =================

const particleContainer=document.createElement("div");

particleContainer.style.position="fixed";
particleContainer.style.inset="0";
particleContainer.style.pointerEvents="none";
particleContainer.style.zIndex="-2";

document.body.appendChild(particleContainer);

for(let i=0;i<45;i++){

const p=document.createElement("div");

p.style.position="absolute";
p.style.width=Math.random()*4+2+"px";
p.style.height=p.style.width;
p.style.borderRadius="50%";
p.style.background="rgba(79,124,255,.35)";

p.style.left=Math.random()*100+"vw";
p.style.top=Math.random()*100+"vh";

particleContainer.appendChild(p);

animateParticle(p);

}

function animateParticle(el){

let x=Math.random()*window.innerWidth;
let y=Math.random()*window.innerHeight;

let dx=(Math.random()-.5)*.4;
let dy=(Math.random()-.5)*.4;

function move(){

x+=dx;
y+=dy;

if(x<0||x>window.innerWidth) dx*=-1;
if(y<0||y>window.innerHeight) dy*=-1;

el.style.transform=`translate(${x}px,${y}px)`;

requestAnimationFrame(move);

}

move();

}

// ================= CUSTOM CURSOR =================

const cursor=document.createElement("div");

cursor.style.width="18px";
cursor.style.height="18px";
cursor.style.border="2px solid #4f7cff";
cursor.style.borderRadius="50%";
cursor.style.position="fixed";
cursor.style.pointerEvents="none";
cursor.style.zIndex="9999";
cursor.style.transition="transform .15s ease";

document.body.appendChild(cursor);

document.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX-9+"px";
cursor.style.top=e.clientY-9+"px";

});

document.querySelectorAll("a,button").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.style.transform="scale(2)";

});

el.addEventListener("mouseleave",()=>{

cursor.style.transform="scale(1)";

});

});

// ================= MOBILE MENU =================

const menu=document.createElement("div");

menu.innerHTML="☰";

menu.style.position="fixed";
menu.style.top="22px";
menu.style.right="20px";
menu.style.fontSize="28px";
menu.style.color="#fff";
menu.style.cursor="pointer";
menu.style.display="none";
menu.style.zIndex="1000";

document.body.appendChild(menu);

const nav=document.querySelector(".nav-links");

function checkMobile(){

if(window.innerWidth<768){

menu.style.display="block";

}else{

menu.style.display="none";

if(nav){

nav.style.display="flex";

}

}

}

checkMobile();

window.addEventListener("resize",checkMobile);

menu.onclick=()=>{

if(!nav) return;

if(nav.style.display==="flex"){

nav.style.display="none";

}else{

nav.style.display="flex";
nav.style.flexDirection="column";
nav.style.position="absolute";
nav.style.top="70px";
nav.style.right="20px";
nav.style.padding="20px";
nav.style.borderRadius="18px";
nav.style.background="rgba(10,15,30,.95)";

}

};

// ================= RANDOM FLOAT =================

setInterval(()=>{

document.querySelectorAll(".glass-card").forEach(card=>{

card.animate([

{

transform:"translateY(0px)"

},

{

transform:"translateY(-8px)"

},

{

transform:"translateY(0px)"

}

],{

duration:3500,

iterations:1

});

});

},3500);

console.log("✅ Nexora AI Premium JS Part 3 Loaded");
/* ==========================================================
   NEXORA AI
   PREMIUM SCRIPT.JS — PART 4
   Final Production Features
========================================================== */

// ================= PAGE PROGRESS =================

const progress = document.createElement("div");

progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "4px";
progress.style.width = "0%";
progress.style.background = "linear-gradient(90deg,#4f7cff,#00d4ff,#7c3aed)";
progress.style.zIndex = "99999";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent =
        (window.scrollY / height) * 100;

    progress.style.width = percent + "%";

});

// ================= HERO TEXT ANIMATION =================

const heroTitle = document.querySelector(".hero h1");

if(heroTitle){

heroTitle.animate([

{
opacity:.5,
transform:"translateY(25px)"
},

{
opacity:1,
transform:"translateY(0)"
}

],{

duration:1200,
fill:"forwards"

});

}

// ================= BUTTON HOVER =================

document.querySelectorAll(".primary-btn,.secondary-btn")
.forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-5px) scale(1.03)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0) scale(1)";

});

});

// ================= AUTO CHAT =================

const aiMessages=[

"Generating response...",

"Analyzing request...",

"Searching knowledge...",

"Optimizing answer...",

"Done."

];

const ai=document.querySelector(".chat .ai:last-child");

if(ai){

let i=0;

setInterval(()=>{

ai.textContent=aiMessages[i];

i++;

if(i>=aiMessages.length){

i=0;

}

},2500);

}

// ================= RANDOM GLOW =================

setInterval(()=>{

document.querySelectorAll(".feature-card").forEach(card=>{

card.style.boxShadow=

`0 20px 60px rgba(${Math.random()*100},
124,
255,
.18)`;

});

},3000);

// ================= PERFORMANCE =================

window.addEventListener("resize",()=>{

document.body.style.overflowX="hidden";

});

// ================= SHORTCUT =================

document.addEventListener("keydown",e=>{

if(e.key==="Escape"){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

// ================= CONSOLE MESSAGE =================

console.log(`
========================================

NEXORA AI

Premium Landing Page Loaded

Version 1.0

========================================
`);

console.log("🚀 Ready.");
<script src="script.js"></script>
