(function () {
    const openmodal = document.querySelector(".open-close");
    const settings = document.querySelector("#settings");
    const micro = document.querySelector("#microphone");
    const play = document.querySelector("#audio");
    const commands = document.querySelector(".main-commands");
    const stop = document.querySelector("#stop");
    const listening = document.querySelector(".listening-animation");

    micro.addEventListener("click", function () {
        commands.classList.add("fadeout");
        commands.classList.remove("fadein");
        listening.classList.add("fadein");
        listening.classList.add("fadeout");
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
    });

    openmodal.addEventListener("click", function () {
        console.log("click to open settings");
        settings.classList.toggle("close");
        settings.classList.toggle("open");
    });
})();
