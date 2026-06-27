// ==========================================
// NovaCalc Valentine Event v2.1
// ==========================================

const ValentineEvent = (() => {

    let interval = null;

    const layer = document.getElementById("eventLayer");

    const hearts = [
        "❤",
        "💖",
        "💕",
        "💗",
        "💘"
    ];

    function createHeart(){

        if(!layer) return;

        const heart = document.createElement("div");

        heart.className = "heart-particle";

        heart.textContent =
            hearts[Math.floor(Math.random()*hearts.length)];

        heart.style.left =
            Math.random()*window.innerWidth+"px";

        heart.style.fontSize =
            (18+Math.random()*24)+"px";

        heart.style.animationDuration =
            (6+Math.random()*4)+"s";

        heart.style.animationDelay =
            Math.random()*2+"s";

        layer.appendChild(heart);

        heart.addEventListener("animationend",()=>{

            heart.remove();

        });

    }

    function start(){

        stop();

        for(let i=0;i<25;i++){

            createHeart();

        }

        interval=setInterval(createHeart,350);

    }

    function stop(){

        clearInterval(interval);

        if(!layer) return;

        layer.querySelectorAll(".heart-particle")
        .forEach(h=>h.remove());

    }

    return{

        start,
        stop

    };

})();