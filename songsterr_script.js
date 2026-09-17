(() => {
    "use strict";

    const CHECK_INTERVAL_MS = 100;

    setInterval(() => {
        // Use the same container and first child as the original console script.
        const target = document.querySelector(".w_eHuW_continueLink")?.firstElementChild;

        if (
            target instanceof HTMLElement &&
            target.getClientRects().length > 0 &&
            getComputedStyle(target).visibility === "visible"
        ) {
            target.click();
        }
    }, CHECK_INTERVAL_MS);
})();
