chrome.contextMenus.create({ 
  id: 'KeyPoint',
  title: 'Launch KeyPoint!',
  contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(() => {
  alert('hjagdjuasdas')
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'launchKeypoint'});
  });
});