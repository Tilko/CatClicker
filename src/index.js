const DocBuild = require("./lib/domBuilding");
const Counter = require("./lib/generators/Counter");

const main = () => {

    function makeCatSection(title, src, alt) {
        const cat = DocBuild.img(src, alt)
        cat.width = 300
        cat.heigth = "auto"
        const counter = new Counter();
        const counterSpan = DocBuild.span(0);
        counterSpan.style.fontSize = "4em"
        cat.addEventListener("click", () => {
            counterSpan.innerText = counter.post()
        })
        console.log([DocBuild.h2(title).outerHTML, cat.outerHTML, counterSpan.outerHTML])
        return DocBuild.div([DocBuild.h2(title), cat, counterSpan])
    }
    document.body.appendChild(makeCatSection("Mitcha", "./img/mitcha.jpg", "The Mitcha cat"))
    document.body.appendChild(makeCatSection("BadCat", "./img/badCat.jpeg", "The bad cat"))
};
document.addEventListener("DOMContentLoaded", main);

//h
//module.exports = ;