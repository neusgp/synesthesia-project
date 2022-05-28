(function () {
    
    const openmodal = document.querySelector(".open-close");
    const settings = document.querySelector("#settings");

    openmodal.addEventListener("click", function () {
        console.log("click to open settings");
        settings.classList.toggle("close");
        settings.classList.toggle("open");
    });
})();
