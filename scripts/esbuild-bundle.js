"use strict";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { build } from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import path from "path";

build({
    entryPoints: [path.join(__dirname, "..", "src", "index.js")],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: path.join(__dirname, "..", "build", "_bundle.js"),
    plugins: [lessLoader()],
    loader: {
        ".svg": "text",
        ".ttf": "binary",
        ".woff": "binary",
        ".woff2": "binary",
        ".eot": "binary",
    },
});

// esbuild src/index.js --bundle --minify --sourcemap --outfile=build/_bundle.js --loader:.svg=text --loader:.ttf=binary --loader:.woff=binary --loader:.woff2=binary --loader:.eot=binary
