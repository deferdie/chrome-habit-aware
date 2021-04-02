var visitSiteButton = document.getElementById("visit-unsafe");

var timeLeft = 2;

document.getElementById("visit-unsafe").addEventListener("click", function() {
  chrome.storage.sync.get(["redirect"], (redirectResult) => {
    setTimeout(() => {
      chrome.storage.sync.get(["domains"], (domainResult) => {
        let domains = domainResult.domains;
        let host = redirectResult.redirect.domain;

        if (domains[host]) {
          const time = new Date().getTime();

          domains[host].visits.push(time);
          domains[host].enabled = false;
          chrome.storage.sync.set({
            domains,
          });
          window.location.href = redirectResult.redirect.to;
        }
      });
    }, timeLeft * 1000);

    setInterval(() => {
      visitSiteButton.innerHTML = "Wait for " + timeLeft + " seconds";
      timeLeft = timeLeft - 1;
    }, 1000);
  });
});
