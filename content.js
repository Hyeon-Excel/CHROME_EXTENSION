(function () {
    // 1. window.open() 차단
    const originalOpen = window.open;
    window.open = function (...args) {
        console.warn("[Block Alert] 새 창/탭 차단됨:", args);
        return null; // 창 안 염
    };

    // 2. 리다이렉션 차단
    const blockRedirect = () => {
        console.warn("[Block Alert] 리다이렉션 시도 차단됨");
        alert("강제 리다이렉션이 차단되었습니다.");
    };

    const overrideRedirect = (prop) => {
        try {
            Object.defineProperty(window.location, prop, {
                configurable: true,
                enumerable: true,
                get: () => window.location[prop],
                set: (val) => {
                    blockRedirect();
                }
            });
        } catch (e) {
            console.error(`[Block Alert] ${prop} 차단 실패:`, e);
        }
    };

    // override location.href, location.replace, location.assign
    ["href", "replace", "assign"].forEach(overrideRedirect);

    // 3. anchor 태그 중 새창 열리는 링크 방지
    document.addEventListener("click", function (e) {
        const target = e.target.closest("a");
        if (target && target.getAttribute("target") === "_blank") {
            const href = target.getAttribute("href");
            if (href && href.match(/(ads?|tracking|sponsored)/i)) {
                e.preventDefault();
                console.warn("[Block Alert] 강제 새창 링크 차단:", href);
            }
        }
    }, true);

    // 4. window.location 변경 감지
    window.addEventListener("beforeunload", (e) => {
        console.log("[Block Alert] 페이지 언로드 감지됨");
    });

})();
