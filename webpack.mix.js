const mix = require('laravel-mix');
const fs = require("fs");

(() => {
    const dirJsResource = "./resources/js";
    let dirJs = fs.readdirSync(dirJsResource, "utf-8");
    dirJs = dirJs.filter(item => /\.js$/.test(item));
    dirJs.forEach(element => {
        mix.js(`resources/js/${element}`, "public/js").vue();
    });
})();
(() => {
    const dirJsResource = "./resources/js/controllers";
    let dirJs = fs.readdirSync(dirJsResource, "utf-8");
    dirJs = dirJs.filter(item => /\.js$/.test(item));
    dirJs.forEach(element => {
        mix.js(`resources/js/controllers/${element}`, "public/js/controllers");
    });
})();
(() => {
    const dirSassResource = "./resources/sass";
    let dirSass = fs.readdirSync(dirSassResource, "utf-8");
    dirSass = dirSass.filter(item => /\.scss$/.test(item));
    dirSass.forEach(element => {
        mix.sass(`resources/sass/${element}`, "public/css");
    });
})();
