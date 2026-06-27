// ==========================================
// NovaCalc Christmas Event v2.1
// ==========================================

const ChristmasEvent = (() => {

    let interval = null;

    const layer = document.getElementById("eventLayer");

    function createSnowflake(){

        if(!layer) return;

        const snow = document.createElement("div");

        snow.className = "snowflake";

        const size = Math.random() * 10 + 6;

        snow.style.width = size + "px";
        snow.style.height = size + "px";

        snow.style.left = Math.random() * window.innerWidth + "px";

        snow.style.animationDuration =
            (Math.random() * 5 + 7) + "s";

        snow.style.animationDelay =
            Math.random() * 2 + "s";

        snow.style.opacity =
            Math.random() * .7 + .3;

        layer.appendChild(snow);

        snow.addEventListener("animationend", () => {

            snow.remove();

        });

    }

    function start(){

        stop();

        for(let i=0;i<40;i++){

            createSnowflake();

        }

        interval = setInterval(createSnowflake,250);

    }

    function stop(){

        clearInterval(interval);

        if(!layer) return;

        layer.querySelectorAll(".snowflake")
            .forEach(flake => flake.remove());

    }

    return{

        start,
        stop

    };

})();