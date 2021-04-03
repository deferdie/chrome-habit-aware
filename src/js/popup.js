// Initialize butotn with users's prefered color
const optionsButton = document.getElementById("options");
const domainsButton = document.getElementById("domains");
const addSiteButton = document.getElementById("addSite");

optionsButton.addEventListener("click", async () => {
  chrome.tabs.create({
    url: "chrome://extensions/?options=" + chrome.runtime.id,
  });
});

domainsButton.addEventListener("click", async () => {
  chrome.tabs.create({
    url: "chrome-extension://" + chrome.runtime.id + "/src/views/domains.html",
  });
});

// Set the current tabs host within the add site button
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var activeTab = tabs[0];
  var host = new URL(activeTab.url).hostname;
  document.getElementById("siteHost").innerHTML = host;
});

// When a user clicks the add site button
addSiteButton.addEventListener("click", async () => {
  chrome.storage.sync.get(["domains"], (result) => {
    var domains = result.domains;

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      var host = new URL(activeTab.url).hostname;
      if (!domains[host]) {
        domains[host] = {
          visits: [],
          enabled: true,
          options: {
            delay: 5,
            message: "",
          },
        };

        chrome.storage.sync.set({
          domains: result.domains,
        });

        console.log(domains);
      }
    });
  });
});
