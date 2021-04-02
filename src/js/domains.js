chrome.storage.sync.get(["domains"], (result) => {
  const domainsContainer = document.getElementById("domains");
  Object.keys(result.domains).map((name) => {
    var e = document.createElement("div");
    e.innerHTML = `
        <div class="domain">
            <h3>${name}</h3>
          </div>
      `;

    domainsContainer.append(e);
  });
});
