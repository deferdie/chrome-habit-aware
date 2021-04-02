var visitSiteButton = document.getElementById("visit-unsafe");

var timeLeft = 2;

document.getElementById("visit-unsafe").addEventListener("click", function() {
  chrome.storage.sync.get(["redirect", "domains"], (result) => {
    console.log(result);
    let domains = result.domains;
    let host = result.redirect.domain;

    if (domains[host]) {
      // Set the timeleft
      let domain = domains[host];
      console.log(domain);
      timeLeft = domain.options.delay * (1000 * 60);

      setTimeout(() => {
        console.log("asdasd");
        const time = new Date().getTime();

        domain.visits.push(time);
        domain.enabled = false;
        chrome.storage.sync.set({
          domains,
        });
        window.location.href = result.redirect.to;
      }, timeLeft);
    }

    setInterval(() => {
      visitSiteButton.innerHTML =
        "Wait for " + Math.floor(timeLeft / 1000) + " seconds";
      timeLeft = timeLeft - 1000;
    }, 1000);
  });
});
