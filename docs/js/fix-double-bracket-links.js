//Shouldn't be needed anymore as there's no more [[implicit links]]
(function () {
    "use strict";
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    function fixDoubleBracketLinks(cssSelector) {
        var sidebarText = $(cssSelector)[0].innerHTML;
        var matches = sidebarText.match(/\[\[(.+?)\]\]/g);
        var result = sidebarText;
        if(matches != null) {
            for(var i = 0; i < matches.length; i++) {
                var text = matches[i].replaceAll('[[','').replaceAll(']]','');
                result = result.replace(matches[i],
                    '<a href="/' +
                    encodeURIComponent(text.replaceAll(' ','-').toLocaleLowerCase()) +
                    '.html">' + text + '</a>')
            }
            $(cssSelector).html(result);
        }
    }

    fixDoubleBracketLinks('#page-content-wrapper');
    fixDoubleBracketLinks('#sidebar-wrapper');
})();