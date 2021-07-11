export default function EnableScrolling() {
    const body = document.querySelector("body");
    body.style.overflow = "visible";
    if (window.location.pathname !== "/people") window.scrollTo(0, 0);
}
