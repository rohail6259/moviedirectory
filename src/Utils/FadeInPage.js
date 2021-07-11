import { gsap } from "gsap";

export default function FadeInPage(elem) {
    const tl = gsap.timeline();
    tl.to(
        elem,
        {
            duration: 2,
            autoAlpha: 1,
            ease: "power4.out",
        },
        0
    ).to(
        ".navbar-wrapper",
        {
            duration: 2,
            autoAlpha: 1,
            ease: "power4.out",
        },
        0
    );
}
