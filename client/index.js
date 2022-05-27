(function () {
    const micro = document.querySelector(".microphone");
    const openmodal = document.querySelector(".open-close");
    const settings = document.querySelector("#settings");

    micro.addEventListener("click", function () {
        console.log("hey, I clicked to open the microphone!");
    });

    openmodal.addEventListener("click", function () {
        console.log("click to open settings");
        settings.classList.toggle("close");
        settings.classList.toggle("open");
    });
})();
