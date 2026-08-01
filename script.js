/* =====================================================
   NEXORA AI - Premium Apple/ChatGPT Style Javascript
===================================================== */


// ===============================
// PAGE LOADING ANIMATION
// ===============================

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});





// ===============================
// NAVBAR GLASS EFFECT
// ===============================

const nav = document.querySelector(".navbar");


window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){

        nav.classList.add("scrolled");

    }else{

        nav.classList.remove("scrolled");

    }

});






// ===============================
// APPLE STYLE SCROLL REVEAL
// ===============================

const revealElements =
document.querySelectorAll(
".card, .hero-content, .ai-window, .power, .cta"
);


const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},
{
threshold:0.15
});


revealElements.forEach(el=>{
observer.observe(el);
});






// ===============================
// AI TYPING EFFECT
// ===============================


const aiText =
"Nexora AI is thinking... Creating intelligent solutions for your future.";


const typingElement =
document.querySelector(".ai");


let index = 0;


function typeAI(){

if(index < aiText.length){

typingElement.innerHTML += aiText.charAt(index);

index++;

setTimeout(typeAI,40);

}

}


setTimeout(typeAI,1200);







// ===============================
// CHATGPT STYLE MESSAGE SYSTEM
// ===============================


const prompts=[

"Build a startup idea",

"Generate Python code",

"Create marketing strategy",

"Explain AI technology"

];


let promptIndex=0;


setInterval(()=>{


const userMessage =
document.querySelector(".user");


if(userMessage){

userMessage.innerHTML =
"You: " + prompts[promptIndex];


promptIndex++;

if(promptIndex >= prompts.length){

promptIndex=0;

}

}


},3000);







// ===============================
// BUTTON RIPPLE EFFECT
// ===============================


document.querySelectorAll("button")
.forEach(button=>{


button.addEventListener("click",function(e){


let ripple=document.createElement("span");


ripple.className="ripple";


this.appendChild(ripple);


let x=e.clientX -
this.getBoundingClientRect().left;


let y=e.clientY -
this.getBoundingClientRect().top;


ripple.style.left=x+"px";

ripple.style.top=y+"px";



setTimeout(()=>{

ripple.remove();

},600);



});


});








// ===============================
// MOUSE 3D AI WINDOW EFFECT
// ===============================


const aiWindow =
document.querySelector(".ai-window");


document.addEventListener("mousemove",(e)=>{


if(!aiWindow) return;


let x =
(e.clientX/window.innerWidth-0.5)*10;


let y =
(e.clientY/window.innerHeight-0.5)*10;



aiWindow.style.transform =
`
rotateY(${x}deg)
rotateX(${-y}deg)
`;



});






// ===============================
// NUMBER COUNTER ANIMATION
// ===============================


const counters =
document.querySelectorAll(".stats h3");


counters.forEach(counter=>{


let target =
counter.innerText;


if(target.includes("∞")) return;


let number=0;


let timer=setInterval(()=>{


number++;


counter.innerText =
number+"x";


if(number>=parseInt(target)){

clearInterval(timer);

}


},80);



});







// ===============================
// AI PARTICLE BACKGROUND
// ===============================


const canvas =
document.createElement("canvas");


canvas.className="particles";


document.body.appendChild(canvas);



const ctx =
canvas.getContext("2d");


canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;



let particles=[];


for(let i=0;i<80;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*2,

speed:Math.random()*0.5

});

}



function animateParticles(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach(p=>{


ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);


ctx.fillStyle=
"rgba(255,255,255,.5)";


ctx.fill();



p.y -= p.speed;



if(p.y<0){

p.y=canvas.height;

}


});


requestAnimationFrame(
animateParticles
);


}



animateParticles();






// ===============================
// SMOOTH PAGE SCROLL
// ===============================


document.querySelectorAll("a")
.forEach(link=>{


link.addEventListener("click",e=>{


if(link.hash){


e.preventDefault();


document.querySelector(link.hash)
.scrollIntoView({

behavior:"smooth"

});


}


});


});





// ===============================
// RESPONSIVE RESIZE
// ===============================


window.addEventListener(
"resize",
()=>{

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;


});



console.log(
"Nexora AI System Loaded 🚀"
);
