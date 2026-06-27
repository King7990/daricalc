// ==========================================
// NovaCalc Easter Event v2.1
// ==========================================

const EasterEvent = (() => {

    let interval = null;

    const layer = document.getElementById("eventLayer");

    const eggs = ["🥚","🐣","🌸"];

    function createEgg(){

        if(!layer) return;

        const egg = document.createElement("div");

        egg.className = "easter-particle";

        egg.textContent =
            eggs[Math.floor(Math.random()*eggs.length)];

        egg.style.left =
            Math.random()*window.innerWidth+"px";

        egg.style.fontSize =
            (20+Math.random()*20)+"px";

        egg.style.animationDuration =
            (7+Math.random()*4)+"s";

        layer.appendChild(egg);

        egg.addEventListener("animationend",()=>{

            egg.remove();

        });

    }

    function start(){

        stop();

        for(let i=0;i<20;i++) createEgg();

        interval=setInterval(createEgg,450);

    }

    function stop(){

        clearInterval(interval);

        layer.querySelectorAll(".easter-particle")
        .forEach(e=>e.remove());

    }

    return{

        start,
        stop

    };

})();