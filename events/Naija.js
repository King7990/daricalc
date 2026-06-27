// ==========================================
// NovaCalc Nigeria Event v2.1
// ==========================================

const NaijaEvent = (()=>{

    let interval=null;

    const layer=document.getElementById("eventLayer");

    const items=["🟢","⚪","✨"];

    function create(){

        if(!layer) return;

        const p=document.createElement("div");

        p.className="naija-particle";

        p.textContent=
        items[Math.floor(Math.random()*items.length)];

        p.style.left=Math.random()*window.innerWidth+"px";

        p.style.fontSize=
        (18+Math.random()*20)+"px";

        p.style.animationDuration=
        (6+Math.random()*5)+"s";

        layer.appendChild(p);

        p.addEventListener("animationend",()=>p.remove());

    }

    function start(){

        stop();

        for(let i=0;i<20;i++) create();

        interval=setInterval(create,300);

    }

    function stop(){

        clearInterval(interval);

        layer.querySelectorAll(".naija-particle")
        .forEach(p=>p.remove());

    }

    return{

        start,
        stop

    };

})();