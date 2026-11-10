(() => {
    "use strict";

    const CHECK_INTERVAL_MS = 100;

    setInterval(() => {
        const target = document.querySelector(".w_eHuW_continueLink")?.firstElementChild;

        if (
            !(target instanceof HTMLElement) ||
            target.getClientRects().length === 0 ||
            getComputedStyle(target).visibility !== "visible"
        ) {
            return;
        }

        if (target instanceof HTMLAnchorElement && target.closest('form.w_eHuW_modal[role="dialog"]')) {
            // Songsterr's Preact bundle stores the link's non-capturing click handler here.
            // Call just that handler because it ignores synthetic DOM clicks.
            const listeners = target.l;
            if (typeof listeners?.clickfalse === "function") {
                listeners.clickfalse({
                    isTrusted: true,
                    preventDefault() {},
                    stopPropagation() {},
                });
                return;
            }
        }

        target.click();
    }, CHECK_INTERVAL_MS);
})();
