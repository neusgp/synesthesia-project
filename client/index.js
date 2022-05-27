(function () {
    const micro = $(".microphone");
    const openmodal = $(".open-close");
    const settings = $("#settings");

    micro.on("click", function () {
        console.log("hey, I clicked to open the microphone!");
    });

    openmodal.on("click", function () {
        console.log("click to open settings");
        if (settings.hasClass("close")) {
            settings.removeClass("close").addClass("open");
            return;
        }
        settings.removeClass("open").addClass("close");
    });
})();
