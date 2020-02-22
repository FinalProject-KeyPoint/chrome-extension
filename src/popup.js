import Mercury from "@postlight/mercury-parser"
const duplicateServer = 'http://localhost:3000'
const keypointServer = 'http://13.250.46.91:3000'

window.onload = function() {

  const $duplicateBtn = document.querySelector('#duplicate');
  const $keypointBtn = document.querySelector('#keypoint');

  $keypointBtn.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let activeTab = tabs[0].url;
      Mercury.parse(activeTab, { contentType: 'text' })
        .then(result => {
          return fetch(`${keypointServer}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "isi_artikel": result.content
            }),
          })
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(err => console.log(err))
    });
  };

  $duplicateBtn.onclick = function() {
    let report = []
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let activeTab = tabs[0].url;
      Mercury.parse(activeTab, { contentType: 'html' })
        .then(result => {
          const arr = result.content.split('</p>')
          const regx = /(<([^>]+)>)/ig;
          arr.forEach(el => {
            if (el && el.indexOf('Baca juga') === -1 && el.indexOf('Gambas:Video') === -1 && el.indexOf('Simak juga video') === -1 && el.indexOf('TAG:') === -1) {
              let sentence = el.replace(regx , "").trim()
              report.push(sentence)
            }
          })
          return fetch(`${duplicateServer}/articles/redactedArticle`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
          })
        })
        .then(response => response.json())
        .then(data => console.log(data.redactedArticle))
        .catch(err => console.log(err))
    });
  }

}