chrome.runtime.onMessage.addListener(function (data, sender, callback) {
	//console.log('data', data);
	switch(data.action){
		//needs permission to do it
		case 'injectJs':
			//console.log('clicke',sender, chrome.runtime.getURL('js/rank-reciever.js'));
 			if(!sender.tab){
				chrome.tabs.query( { active: true, currentWindow: true }, function(tabs){
					//console.log(tabs[0]);
					injectJsCurrentTab(tabs[0]);
				});
			 }
			 else{
				injectJs(sender.tab);
			 }
			
			//console.log(sender.tab, sender.tab.id);
			break;
		case 'checkIfNeedRating':
			///console.log('clicke',tab.id, chrome.runtime.getURL('js/rank-reciever.js'));
			callback(!localStorage.getItem('rankRequested'));
			break;
		case 'rankRequested':
			localStorage.setItem('rankRequested', 1);
			break;
	}
});
function injectJsCurrentTab(){
	chrome.tabs.query( { active: true, currentWindow: true }, function(tabs){
		//console.log(tabs[0]);
		injectJs(tabs[0]);
	});
}
function injectJs(tab){
	//console.log(tab)
	if(tab){
		chrome.tabs.executeScript(tab.id,{file:'js/extention-data.js'});
		chrome.tabs.executeScript(tab.id,{file:'js/show-popup.js'}, function(){
			chrome.tabs.executeScript(tab.id,{code:"checkIfRankNeededAndAndAddRank()"})
		});
	}
}