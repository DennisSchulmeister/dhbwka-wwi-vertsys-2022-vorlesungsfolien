"use strict";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { serve } from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import path from "path";

serve({
    servedir: path.join(__dirname, "..", "static"),
    port: 8080,
}, {
    entryPoints: [path.join(__dirname, "..", "src", "index.js")],
    bundle: true,
    outfile: path.join(__dirname, "..", "static", "_bundle.js"),
    plugins: [lessLoader()],
    loader: {
        ".svg": "text",
        ".ttf": "binary",
        ".woff": "binary",
        ".woff2": "binary",
        ".eot": "binary",
    },
}).then(() => {
    console.log("Listening on port 8080");    
});

// esbuild src/index.js --servedir=static --bundle --outfile=static/_bundle.js --loader:.svg=text --loader:.ttf=binary --loader:.woff=binary --loader:.woff2=binary --loader:.eot=binary
