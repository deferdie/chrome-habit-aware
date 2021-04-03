var visitSiteButton = document.getElementById("visit-unsafe");
var personalMessage = document.getElementById("personal-message");

var timeLeft = 100;
var domains = null;
var domain = null;
var host = null;
var redirect = null;

chrome.storage.sync.get(["redirect", "domains"], (result) => {
  redirect = result.redirect;
  domains = result.domains;
  host = result.redirect.domain;
  domain = domains[host];

  if (domain.options.message) {
    personalMessage.innerHTML = domain.options.message;
  }
});

document.getElementById("visit-unsafe").addEventListener("click", function() {
  timeLeft = domain.options.delay * (1000 * 60);

  setTimeout(() => {
    var time = new Date().getTime();

    domain.visits.push(time);
    domain.enabled = false;
    chrome.storage.sync.set({
      domains,
    });
    window.location.href = result.redirect.to;
  }, timeLeft);

  setInterval(() => {
    visitSiteButton.innerHTML =
      "Wait for " + Math.floor(timeLeft / 1000) + " seconds";
    timeLeft = timeLeft - 1000;
  }, 1000);
});
