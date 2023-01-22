// Changed imports from deps to direct node modules.
import { parse, HTMLElement, TextNode } from "node-html-parser";
import MarkdownIt from "markdown-it";
const Markdown = new MarkdownIt();
const TELEGRAM_REGEX = /^(https?):\/\/(t\.me|telegram\.me|telegram\.dog)\/([a-zA-Z0-9_]+)\/(\d+)/;
const VIMEO_REGEX = /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
const TWITTER_REGEX = /(https?:\/\/)?(www.)?twitter.com\/([a-z,A-Z]*\/)*status\/([0-9])[?]?.*/;
const YOUTUBE_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/;
export const parseMarkdown = (content) => {
    const md = Markdown.render(content).replace(/\<del\>(.*)\<\/del\>/gim, "<s>$1</s>");
    return parseHtml(md);
};
export const parseHtml = (content) => {
    // Replaced new DOMParser.parseFromString(conent, "text/html").body to this
    const body = parse(content);
    const node = domToNode(body);
    if (node)
        return typeof node === "string" ? node : node.children;
};
// Replaced element with Node
const domToNode = (el) => {
    var _a, _b, _c;
    // Replaced to direct type checking
    if (el instanceof TextNode)
        return el.rawText;
    // Added this to check types
    const isHTMLel = el instanceof HTMLElement;
    // Tag is only for htmlelement
    const tag = isHTMLel ? (_a = el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase() : null;
    const nodeElement = { tag: tag };
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
    const href = isHTMLel ? el.getAttribute("href") : null;
    if (href) {
        nodeElement.attrs = { href };
    }
    let src = isHTMLel ? el.getAttribute("src") : null;
    if (src) {
        if (nodeElement.tag === "iframe") {
            if (TWITTER_REGEX.test(src)) {
                const match = TWITTER_REGEX.exec(src);
                if (match) {
                    src = `/embed/twitter?url=${src}`;
                }
            }
            else if (YOUTUBE_REGEX.test(src)) {
                const match = YOUTUBE_REGEX.exec(src);
                if (match) {
                    src = `/embed/youtube?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${match[1]}`)}`;
                }
            }
            else if (VIMEO_REGEX.test(src)) {
                const match = VIMEO_REGEX.exec(src);
                if (match) {
                    src = `/embed/vimeo?url=${encodeURIComponent(`https://vimeo.com/${match.pop()}`)}`;
                }
            }
            else if (TELEGRAM_REGEX.test(src)) {
                const match = TELEGRAM_REGEX.exec(src);
                if (match) {
                    src = `/embed/telegram?url=${src}`;
                }
            }
        }
        nodeElement.attrs = { ...nodeElement.attrs, src };
    }
    if (el.childNodes.length > 0) {
        nodeElement.children = [];
        for (let i = 0; i < el.childNodes.length; i++) {
            const child = el.childNodes[i];
            const node = domToNode(child);
            if (node)
                nodeElement.children.push(node);
        }
    }
    return nodeElement;
};
