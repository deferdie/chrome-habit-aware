const clearAllSiteCountButton = document.getElementById("clearAllSiteCount");
const clearAllSitesButton = document.getElementById("clearAllSites");

clearAllSiteCountButton.addEventListener("click", async () => {
  chrome.storage.sync.get(["domains"], (result) => {
    var domains = result.domains;

    Object.keys(domains).map((k) => (domains[k] = []));

    chrome.storage.sync.set({
      domains: domains,
    });
  });
});

clearAllSitesButton.addEventListener("click", async () => {
  chrome.storage.sync.set({
    domains: {},
  });
});
