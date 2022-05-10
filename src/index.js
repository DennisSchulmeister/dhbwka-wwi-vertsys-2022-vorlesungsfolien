import "bootstrap/dist/css/bootstrap.min.css";
import Bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import MiniTutorial from "@dschulmeis/mini-tutorial.js";
import "@dschulmeis/mini-tutorial.js/themes/slideshow.css";
// Bug in esbuild-plugin-less and others: Module paths are not recognized!
import "../node_modules/@dschulmeis/mini-tutorial.js/themes/bootstrap.less";

import LS_Plugin_ExtraTags from "@dschulmeis/ls-plugin-extra-tags";
import LS_Plugin_Markdown from "@dschulmeis/ls-plugin-markdown";

import LS_Plugin_HighlightJS from "@dschulmeis/ls-plugin-highlight.js";
import HLJS_Language_XML from 'highlight.js/lib/languages/xml';
import HLJS_Language_CSS from 'highlight.js/lib/languages/css';
import HLJS_Language_JS from "highlight.js/lib/languages/javascript";
import HLJS_Language_JSON from "highlight.js/lib/languages/json";
import HLJS_Language_Docker from "highlight.js/lib/languages/dockerfile";
import HLJS_Language_YAML from "highlight.js/lib/languages/yaml";
import HLJS_Language_HTTP from "highlight.js/lib/languages/http";
import "highlight.js/styles/atom-one-light.css";

import * as AsciinemaPlayer from "asciinema-player";
import "asciinema-player/dist/bundle/asciinema-player.css";

import "./style.less";

window.addEventListener("load", () => {
    let mt = new MiniTutorial({
        tocStyle: "hamburger",
        sectionTitle: "#page-title",
        plugins: [
            // TODO: Auslagern in eigene Bibliothek
            {
                preprocessHtml(html) {
                    html.querySelectorAll("terminal-cast").forEach(element => {
                        let url = element.getAttribute("url") || "";
                        let divElement = document.createElement("div");
                        divElement.style.height = "30em";
                        AsciinemaPlayer.create(url, divElement, {fit: "both", theme: "solarized-dark"});
                        element.replaceWith(divElement);
                    });
                }
            },
            new LS_Plugin_ExtraTags({
                labelCarouselNext: "Nächstes Bild",
                labelCarouselPrev: "Vorheriges Bild",
                labelCarouselReset: "Nochmal von vorne",
                labelGithubEditOnline: "Online-IDE starten",
                labelGithubEditDownload: "Quellcode herunterladen",
                labelQuizPoints: "{1} von {2}",
                labelQuizEvaluate: "Bewerten",
                labelQuizNewTry: "Neuer Versuch",
                githubEditUrlPrefix: "https://github.com/DennisSchulmeister/dhbwka-wwi-vertsys-2022-quellcodes/tree/main/",
            }),
            new LS_Plugin_Markdown(),
            new LS_Plugin_HighlightJS({
                languages: {
                    html: HLJS_Language_XML,
                    css: HLJS_Language_CSS,
                    javascript: HLJS_Language_JS,
                    json: HLJS_Language_JSON,
                    docker: HLJS_Language_Docker,
                    yaml: HLJS_Language_YAML,
                    yml: HLJS_Language_YAML,
                    http: HLJS_Language_HTTP,
                },
                highlightAll: true,
            }),
        ],
    });

    mt.start();
});
