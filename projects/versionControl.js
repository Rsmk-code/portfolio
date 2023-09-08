// This code should be placed after the ./projects/config.js script tag
document.addEventListener('DOMContentLoaded', function() {
    var version = window.version || 3; // Default to version 3 if not set in ./projects/config.js
    var cssLink = document.querySelector('link[href^="./"]');
    var jsScript = document.querySelector('script[src^="./"]');
    
    cssLink.href = cssLink.href + '?v=' + version;
    jsScript.src = jsScript.src + '?v=' + version;
});
