(function () {
    const openmodal = document.querySelector(".open-close");
    const settings = document.querySelector("#settings");
    const micro = document.querySelector("#microphone");
    const play = document.querySelector("#audio");
    const commands = document.querySelector(".main-commands");

    micro.addEventListener("click", function () {
        commands.classList.add("hide");
    });

    play.addEventListener("click", function () {
        commands.classList.add("hide");
    });

    openmodal.addEventListener("click", function () {
        console.log("click to open settings");
        settings.classList.toggle("close");
        settings.classList.toggle("open");
    });
})();
