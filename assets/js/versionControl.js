// This code should be placed after the config.js script tag
document.addEventListener('DOMContentLoaded', function() {
    var version = window.version || 2; // Default to version 2 if not set in config.js
    var cssLinks = document.querySelectorAll('link[href^="./assets/css/"]');
    var jsScripts = document.querySelectorAll('script[src^="./assets/js/"]');
    
    cssLinks.forEach(function(link) {
        link.href = link.href + '?v=' + version;
    });

    jsScripts.forEach(function(script) {
        script.src = script.src + '?v=' + version;
    });
});
