function scrollFunction() {
    var o = document.getElementById("navbar");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        o.classList.add("scroll-navbar");
        o.classList.add("fixed-top");
        $(".scroll-to-top").css("display", "block");
    } else {
        o.classList.remove("scroll-navbar");
        o.classList.remove("fixed-top");
        $(".scroll-to-top").css("display", "none");
    }
}

window.onscroll = function () {
    scrollFunction();
};
