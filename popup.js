document.addEventListener("DOMContentLoaded", () => {
    const httpsStatus = document.getElementById("https-status");
    const safetyStatus = document.getElementById("safety-status");

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const url = new URL(tabs[0].url);
        const isHTTPS = url.protocol === "https:";
        httpsStatus.textContent = isHTTPS ? "✅ 안전한 HTTPS" : "⚠️ 비안전한 HTTP";

        // 간단한 블랙리스트 예시
        const blacklist = ["phishing.com", "malware.example"];
        const isDangerous = blacklist.includes(url.hostname);
        safetyStatus.textContent = isDangerous ? "🔴 위험한 사이트" : "🟢 안전함";
    });

    document.getElementById("recheck").addEventListener("click", () => location.reload());
});