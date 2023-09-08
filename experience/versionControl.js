// This code should be placed after the ./experience/config.js script tag
document.addEventListener('DOMContentLoaded', function() {
    var version = window.version || 2; // Default to version 2 if not set in ./experience/config.js
    var cssLink = document.querySelector('link[href^="./"]');
    var jsScript = document.querySelector('script[src^="./"]');
    
    cssLink.href = cssLink.href + '?v=' + version;
    jsScript.src = jsScript.src + '?v=' + version;
});
