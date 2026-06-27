// ==========================================
// NovaCalc Halloween Event v2.1
// ==========================================

const HalloweenEvent = (() => {

    let interval = null;

    const layer = document.getElementById("eventLayer");

    const icons = ["🎃","🦇"];

    function createParticle(){

        if(!layer) return;

        const particle = document.createElement("div");

        particle.className = "halloween-particle";

        particle.textContent =
            icons[Math.floor(Math.random()*icons.length)];

        particle.style.left =
            Math.random()*window.innerWidth+"px";

        particle.style.fontSize =
            (20+Math.random()*18)+"px";

        particle.style.animationDuration =
            (8+Math.random()*6)+"s";

        particle.style.animationDelay =
            Math.random()*2+"s";

        layer.appendChild(particle);

        particle.addEventListener("animationend",()=>{

            particle.remove();

        });

    }

    function start(){

        stop();

        for(let i=0;i<25;i++){

            createParticle();

        }

        interval=setInterval(createParticle,450);

    }

    function stop(){

        clearInterval(interval);

        if(!layer) return;

        layer.querySelectorAll(".halloween-particle")
        .forEach(p=>p.remove());

    }

    return{

        start,
        stop

    };

})();