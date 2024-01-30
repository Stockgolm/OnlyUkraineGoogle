function highlightLinks() {
    var cites = document.getElementsByTagName('cite');
    for(var i=0; i<cites.length; i++) {
        var cite = cites[i];
        if(cite.textContent.includes('.ru') || cite.textContent.includes('.рф')|| cite.textContent.includes('.su')|| cite.textContent.includes('ru.')) {
            cite.style.color = '#Ff0009';
        } else if(cite.textContent.includes('.ua') || cite.textContent.includes('.укр')|| cite.textContent.includes('uk.')) {
            cite.style.color = '#22de0f';
        }
    }
}
highlightLinks();
var observer = new MutationObserver(highlightLinks);
observer.observe(document.body, { childList: true, subtree: true });