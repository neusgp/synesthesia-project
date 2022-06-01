(function () {
    const openmodal = document.querySelector(".open-close");
    const settings = document.querySelector("#settings");
    const micro = document.querySelector("#microphone");
    const play = document.querySelector("#audio");
    const commands = document.querySelector(".main-commands");
    const stop = document.querySelector("#stop");
    const listening = document.querySelector(".listening-animation");
    const keeprec = document.querySelector("#keep-recording");
    const pause = document.querySelector("#pause");
    const instructions = document.querySelector(".instructions");
    const clear = document.querySelector("#clear");

    micro.addEventListener("click", function () {
        commands.classList.add("fadeout");
        commands.classList.remove("fadein");
        listening.classList.add("fadein");
        listening.classList.add("fadeout");
        instructions.classList.remove("fadein");
        instructions.classList.add("fadeout");
        clear.classList.remove("fadeout");
        clear.classList.add("fadein");
    });

    play.addEventListener("click", function () {
        commands.classList.add("fadeout");
        commands.classList.remove("fadein");
    });

    stop.addEventListener("click", function () {
        commands.classList.toggle("fadein");
        commands.classList.toggle("fadeout");
        listening.classList.remove("fadein");
        listening.classList.add("fadeout");
        instructions.classList.toggle("fadein");
        instructions.classList.toggle("fadeout");
        clear.classList.remove("fadein");
        clear.classList.add("fadeout");
    });

    pause.addEventListener("click", function () {
        listening.classList.remove("fadein");
        listening.classList.add("fadeout");
        keeprec.classList.remove("fadeout");
        keeprec.classList.add("fadein");
    });

    keeprec.addEventListener("click", function () {
        listening.classList.remove("fadeout");
        listening.classList.add("fadein");
        keeprec.classList.remove("fadein");
        keeprec.classList.add("fadeout");
    });

    openmodal.addEventListener("click", function () {
        console.log("click to open settings");
        settings.classList.toggle("close");
        settings.classList.toggle("open");
    });
})();
