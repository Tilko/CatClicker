const DocBuild = require("./lib/domBuilding");
const Counter = require("./lib/generators/Counter");

const main = () => {
    const cats = [
        { name: "Mitcha", src: "./img/mitcha.jpg" },
        { name: "BadCat", src: "./img/badCat.jpeg" },
        { name: "Chauve-Chat", src: "./img/cat3.jpeg" },
        { name: "CatQuart", src: "./img/cat4.jpeg" },
        { name: "CatMan", src: "./img/cat5.jpeg" }
    ]
    const catListContainer = document.querySelector("#catListContainer")
    const currentCatContainer = document.querySelector("#currentCatContainer")

    function makeCatSection(title, src, alt) {
        const cat = DocBuild.img(src, alt)
        cat.width = 300
        cat.heigth = "auto"
        const counter = new Counter();
        const clickCounterSpan = DocBuild.span(0);
        clickCounterSpan.style.fontSize = "4em"
        clickCounterSpan.className = "clickCount"
        cat.addEventListener("click", () => {
            clickCounterSpan.innerText = counter.post()
        })
        return [DocBuild.h2(title), cat, clickCounterSpan]
    }
    function makeCatNavLi(catName) {
        liElem = DocBuild.span(catName)
        liElem.style.cursor = "pointer"
        return liElem
    }
    cats.forEach(cat => {
        cat.liElem = catLi = makeCatNavLi(cat.name)
        cat.catSection = DocBuild.div(makeCatSection(cat.name, cat.src, `The ${cat.name} cat.`))



        catLi.addEventListener("click", () => {
            currentCatContainer.replaceChild(cat.catSection, currentCatContainer.firstChild)
        })
    })

    currentCatContainer.appendChild(cats[0].catSection);

    catListContainer.appendChild(DocBuild.ul(cats.map(cat => cat.liElem)))
};
document.addEventListener("DOMContentLoaded", main);

//h
//module.exports = ;