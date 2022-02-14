import MiniTutorial from "mini-tutorial.js";
import mtUtils from "mini-tutorial.js/utils";
import "mini-tutorial.js/themes/slideshow.css";
import "mini-tutorial.js/themes/common.css";
import "mini-tutorial.js/themes/fontello/css/fontello.css";

import markdownIt from "markdown-it/dist/markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";
import slugify from "@sindresorhus/slugify";

import hljs from 'highlight.js/lib/core';
import hljsLangXML from 'highlight.js/lib/languages/xml';
import hljsLangCSS from 'highlight.js/lib/languages/css';
import hljsLangJS from "highlight.js/lib/languages/javascript";
import hljsLangJSON from "highlight.js/lib/languages/json";
import hljsStyle from "highlight.js/styles/atom-one-light.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import "./style.less";

window.addEventListener("load", () => {
    // markdown-it
    let md = markdownIt({
        html: true,
        linkify: true,
        typographer: true,
    });

    md.use(markdownItAttrs);
    md.use(markdownItAnchor, {slugify: s => slugify(s)});

    let _gobbleWhitespace = html => {
        html = mtUtils.removeLeadingLinebreaks(html);
        html = mtUtils.removeTrailingLinebreaks(html);
        html = mtUtils.shiftLinesLeft(html);
        html = mtUtils.shiftLinesLeft(html);
        html = mtUtils.removeTrailingLinebreaks(html);
        return html;
    };

    document.querySelectorAll(".markdown").forEach(el => el.innerHTML = md.render(_gobbleWhitespace(el.innerHTML)));
    document.querySelectorAll(".md").forEach(el => el.innerHTML = md.renderInline(_gobbleWhitespace(el.innerHTML)));

    // highlightjs
    hljs.registerLanguage("html", hljsLangXML);
    hljs.registerLanguage("css", hljsLangCSS);
    hljs.registerLanguage("javascript", hljsLangJS);
    hljs.registerLanguage("json", hljsLangJSON);
    document.querySelectorAll("pre code").forEach(el => hljs.highlightElement(el));

    // mini-tutorial.js
    let mt = new MiniTutorial({
        tocStyle: "hamburger",
        sectionTitle: "#page-title"
    });

    mt.start();
});
