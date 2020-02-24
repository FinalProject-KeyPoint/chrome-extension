import Mercury from "./mercury"

window.onload = function() {

  const $launchBtn = document.querySelector('#launch-btn');

  $launchBtn.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let activeTab = tabs[0];
      Mercury.parse(activeTab.url, { contentType: 'html' })
        .then(result => {
          result.content = 
            result.content.replace(/<style[^>]*>.*<\/style>/gm, ' ')
            .replace(/Page [0-9]/gm, ' ')
            .replace(/<[^>]+>/gm, ' ')
            .replace(/([\r\n]+ +)+/gm, ' ')
            .replace(/&nbsp;/gm,' ');
            chrome.tabs.executeScript(activeTab.id, { file: "build/summary.js" }, function() {
              setTimeout(() => {
                chrome.tabs.sendMessage(activeTab.id, { type: "SET_CONTENT", scriptOptions: {param: result} }, function() {
                });
              }, 500);
            })
        })
        .catch(err => console.log(err))
    });
  };

}