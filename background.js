chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    domains: {},
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status == "complete") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      if (activeTab === undefined) return;

      chrome.storage.sync.get(["domains"], (result) => {
        const domainsToTrack = result.domains;

        var url = new URL(activeTab.url);
        var activeTabHost = url.hostname;
        if (domainsToTrack[activeTabHost]) {
          redirect("http://www.google.com");
          log(activeTabHost);

          return;
        }

        checkForAdultContent(activeTab);
      });
    });
  }
});

function redirect(to) {
  chrome.tabs.update({ url: to });
}

function log(url) {
  chrome.storage.sync.get(["domains"], (result) => {
    let domains = result.domains;
    const time = new Date().getTime();

    if (domains[url]) {
      domains[url].visits.push(time);
    }

    chrome.storage.sync.set({
      domains,
    });
  });
}

function checkForAdultContent(tab) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id, allFrames: true },
      files: ["./src/js/getMessageContent.js"],
    },
    function (res) {
      // console.log(res);
    }
  );
}

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    var res = request.source.match("porn|PORN");
    if (res != undefined && res.length > 0) {
      console.log("possible adult site, suggest warning");
    }
  }
});
