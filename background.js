chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}

chrome.browserAction.onClicked.addListener(function(tab){
  premissions.requestPermissions({ permissions:[]}, mergeWindows, function(){
    alertNotif(tab);
  })

});

function mergeWindows(){
  chrome.windows.getCurrent(function(currntWindow){

    chrome.windows.getAll(function(windows){
    
    for(let otherWindow of windows){
      //console.log(otherWindow.id, currntWindow.id)
      if(otherWindow.id != currntWindow.id){
        chrome.tabs.query({windowId:otherWindow.id}, function(tabs){
          //console.log(tabs);
          let tabsIds = [];
          for(let tab of tabs){
            tabsIds.push(tab.id);
          }
          chrome.tabs.move(tabsIds, {windowId:currntWindow.id,index:-1});
        })
      }
    }
    
    });

  });
}

function alertNotif(tab){
  chrome.tabs.executeScript(tab.id,{code: "alert('" + chrome.i18n.getMessage("need_permissions") + "')"});
}