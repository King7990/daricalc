// ==========================================
// NovaCalc New Year Event v2.1
// ==========================================

const NewYearEvent = (() => {

    let launchInterval = null;

    const layer = document.getElementById("eventLayer");

    function createFirework(){

        if(!layer) return;

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + 80;

        for(let i = 0; i < 30; i++){

            const particle = document.createElement("div");

            particle.className = "firework-particle";

            particle.style.left = x + "px";
            particle.style.top = y + "px";

            particle.style.setProperty(
                "--angle",
                (360 / 30) * i + "deg"
            );

            particle.style.setProperty(
                "--distance",
                (80 + Math.random() * 80) + "px"
            );

            particle.style.background =
                `hsl(${Math.random()*360},100%,60%)`;

            layer.appendChild(particle);

            particle.addEventListener("animationend",()=>{

                particle.remove();

            });

        }

    }

    function start(){

        stop();

        createFirework();

        launchInterval = setInterval(createFirework,1800);

    }

    function stop(){

        clearInterval(launchInterval);

        if(!layer) return;

        layer.querySelectorAll(".firework-particle")
        .forEach(p=>p.remove());

    }

    return{

        start,
        stop

    };

})();