"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtml = exports.parseMarkdown = void 0;
// Changed imports from deps to direct node modules.
var node_html_parser_1 = require("node-html-parser");
var markdown_it_1 = require("markdown-it");
var Markdown = new markdown_it_1.default();
var TELEGRAM_REGEX = /^(https?):\/\/(t\.me|telegram\.me|telegram\.dog)\/([a-zA-Z0-9_]+)\/(\d+)/;
var VIMEO_REGEX = /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
var TWITTER_REGEX = /(https?:\/\/)?(www.)?twitter.com\/([a-z,A-Z]*\/)*status\/([0-9])[?]?.*/;
var YOUTUBE_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/;
var parseMarkdown = function (content) {
    var md = Markdown.render(content).replace(/\<del\>(.*)\<\/del\>/gim, "<s>$1</s>");
    return (0, exports.parseHtml)(md);
};
exports.parseMarkdown = parseMarkdown;
var parseHtml = function (content) {
    // Replaced new DOMParser.parseFromString(conent, "text/html").body to this
    var body = (0, node_html_parser_1.parse)(content);
    var node = domToNode(body);
    if (node)
        return typeof node === "string" ? node : node.children;
};
exports.parseHtml = parseHtml;
// Replaced element with Node
var domToNode = function (el) {
    var _a, _b, _c;
    // Replaced to direct type checking
    if (el instanceof node_html_parser_1.TextNode)
        return el.rawText;
    // Added this to check types
    var isHTMLel = el instanceof node_html_parser_1.HTMLElement;
    // Tag is only for htmlelement
    var tag = isHTMLel ? (_a = el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase() : null;
    var nodeElement = { tag: tag };
    switch (tag) {
        case "h1":
            nodeElement.tag = "h3";
            break;
        case "h2":
            nodeElement.tag = "h4";
            break;
        case "h5":
            nodeElement.tag = "h3";
            break;
        case "h6":
            nodeElement.tag = "h4";
            break;
        case "del":
            nodeElement.tag = "s";
            break;
        case "code":
            // Having a code block like `<pre><code>content here</code></pre>`, is not rendering as an actual "pre" code block.
            // But, instead having just `<pre>content here</pre>` or a `<pre><pre>content here</pre></pre>` works fine.
            if (((_c = (_b = el.parentNode) === null || _b === void 0 ? void 0 : _b.tagName) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === "pre") {
                nodeElement.tag = "pre";
            }
            break;
    }
    var href = isHTMLel ? el.getAttribute("href") : null;
    if (href) {
        nodeElement.attrs = { href: href };
    }
    var src = isHTMLel ? el.getAttribute("src") : null;
    if (src) {
        if (nodeElement.tag === "iframe") {
            if (TWITTER_REGEX.test(src)) {
                var match = TWITTER_REGEX.exec(src);
                if (match) {
                    src = "/embed/twitter?url=".concat(src);
                }
            }
            else if (YOUTUBE_REGEX.test(src)) {
                var match = YOUTUBE_REGEX.exec(src);
                if (match) {
                    src = "/embed/youtube?url=".concat(encodeURIComponent("https://www.youtube.com/watch?v=".concat(match[1])));
                }
            }
            else if (VIMEO_REGEX.test(src)) {
                var match = VIMEO_REGEX.exec(src);
                if (match) {
                    src = "/embed/vimeo?url=".concat(encodeURIComponent("https://vimeo.com/".concat(match.pop())));
                }
            }
            else if (TELEGRAM_REGEX.test(src)) {
                var match = TELEGRAM_REGEX.exec(src);
                if (match) {
                    src = "/embed/telegram?url=".concat(src);
                }
            }
        }
        nodeElement.attrs = __assign(__assign({}, nodeElement.attrs), { src: src });
    }
    if (el.childNodes.length > 0) {
        nodeElement.children = [];
        for (var i = 0; i < el.childNodes.length; i++) {
            var child = el.childNodes[i];
            var node = domToNode(child);
            if (node)
                nodeElement.children.push(node);
        }
    }
    return nodeElement;
};
