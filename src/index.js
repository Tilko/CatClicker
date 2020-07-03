const DocBuild = require("./lib/domBuilding");
const Counter = require("./lib/generators/Counter");

const main = () => {
    const cats = [
        { name: "Mitcha", src: "./img/mitcha.jpg" },
        { name: "BadCat", src: "./img/badCat.jpeg" },
        { name: "cat3", src: "./img/cat3.jpeg" },
        { name: "cat4", src: "./img/cat4.jpeg" },
        { name: "cat5", src: "./img/cat5.jpeg" }
    ]
    const catListContainer = document.querySelector("#catListContainer")
    const currentCatContainer = document.querySelector("#currentCatContainer")

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
        return DocBuild.div([DocBuild.h2(title), cat, counterSpan])
    }
    cats.forEach(cat => {
        cat.liElem = DocBuild.span(cat.name)

        cat.catSection = makeCatSection(cat.name, cat.src, `The ${cat.name} cat.`)
        cat.liElem.style.cursor = "pointer"
        cat.liElem.addEventListener("click", () => {
            currentCatContainer.replaceChild(cat.catSection, currentCatContainer.firstChild)
        })
    })

    currentCatContainer.appendChild(cats[0].catSection);

    catListContainer.appendChild(DocBuild.ul(cats.map(cat => cat.liElem)))
};
document.addEventListener("DOMContentLoaded", main);

//h
//module.exports = ;