// Page load animation
window.addEventListener("load", () => {
    document.documentElement.classList.add("page-loaded");
});

// Features toggle
$(".features-main-title").on("click", function (e) {
    e.preventDefault();

    const isActive = $(this).hasClass("is-active");

    $(".features-main").removeClass("is-active");

    if (!isActive) {
        $(this).parent(".features-main").addClass("is-active");
        $(this).next(".features-main").addClass("is-active");
    }
});

/* =========================
   Review Widget – Idle Load
========================= */
(function () {
    function loadReviewWidget() {
        // Prevent double loading
        if (window.reviewWidgetLoaded) return;
        window.reviewWidgetLoaded = true;

        const script = document.createElement("script");
        script.src = "https://www.reviewplc.com/dashboard1/integrationjs/js/integarioncarouselblack.js";
        script.async = true;
        document.body.appendChild(script);
    }

    if ("requestIdleCallback" in window) {
        requestIdleCallback(loadReviewWidget);
    } else {
        setTimeout(loadReviewWidget, 2000);
    }
})();