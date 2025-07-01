const adSelectors = [
    '[id*="ad"]',
    '[class*="ad"]',
    '[class*="sponsor"]',
    '[id*="banner"]'
];

adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(elem => elem.remove());
});
