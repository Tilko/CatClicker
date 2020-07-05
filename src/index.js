"use strict";
const DocBuild = require("./lib/domBuilding");

const index = function () {
    const catListDomNode = document.querySelector("#catListContainer")
    const imgDomNode = document.querySelector(".catImg")
    const clickCountSpan = document.querySelector(".clickCount")
    const titleDomNode = document.querySelector(".currentCatContainerTitle")

    const model = {
        init: function () {
            this.cats = [
                { name: "Mitcha", src: "./img/mitcha.jpg" },
                { name: "BadCat", src: "./img/badCat.jpeg" },
                { name: "Chauve-Chat", src: "./img/cat3.jpeg" },
                { name: "CatQuart", src: "./img/cat4.jpeg" },
                { name: "CatMan", src: "./img/cat5.jpeg" }
            ]
            this.cats.forEach(cat => { cat.clickCount = 0; });
        },
    }
    const octopus = {
        init() {
            model.init();
            this.currentCat = model.cats[0];
            catListDomNode.appendChild(
                DocBuild.navlistItemsFragment(
                    model.cats,
                    cat => cat.name,
                    (cat, li) => li.addEventListener("click", () => {
                        currentCatSectionView.render(this.currentCat = cat)
                    })
                )
            )
            imgDomNode.addEventListener("click",
                () => currentCatSectionView.renderClickCount(++this.currentCat.clickCount));
            currentCatSectionView.render(this.currentCat)
        }
    }
    const currentCatSectionView = {
        render(currentCat) {
            titleDomNode.innerText = currentCat.name;
            imgDomNode.src = currentCat.src;
            clickCountSpan.innerText = currentCat.clickCount;
        },
        renderClickCount(clickCount) {
            clickCountSpan.innerText = clickCount;
        }
    }
    octopus.init();
};

document.addEventListener("DOMContentLoaded", index);

// const index2 = function () {

//     const cats = [
//         { name: "Mitcha", src: "./img/mitcha.jpg" },
//         { name: "BadCat", src: "./img/badCat.jpeg" },
//         { name: "Chauve-Chat", src: "./img/cat3.jpeg" },
//         { name: "CatQuart", src: "./img/cat4.jpeg" },
//         { name: "CatMan", src: "./img/cat5.jpeg" }
//     ]
//     const catListContainer = document.querySelector("#catListContainer")
//     const currentCatContainer = document.querySelector("#currentCatContainer")

//     function makeCatSectionElems(title, src, alt) {
//         const catImg = DocBuild.img(src, alt)
//         catImg.width = 300
//         catImg.heigth = "auto"
//         catImg.style.cursor = "pointer"
//         const clickCounterSpan = DocBuild.span(0);
//         clickCounterSpan.className = "clickCount";
//         clickCounterSpan.style.fontSize = "4em"
//         return { title: DocBuild.h2(title), catImg, clickCounterSpan }
//     }
//     function makeCatNavLi(catName) {
//         const liElem = DocBuild.span(catName)
//         liElem.style.cursor = "pointer"
//         return liElem
//     }
//     cats.forEach(cat => {
//         const catSectionElems = makeCatSectionElems(cat.name, cat.src, `The ${cat.name} cat.`);
//         const { title, catImg, clickCounterSpan } = catSectionElems;

//         cat.clickCount = 0;
//         catImg.addEventListener("click", () => {
//             cat.clickCount++;
//             clickCounterSpan.innerText = cat.clickCount;
//         })

//         const catLi = makeCatNavLi(cat.name);
//         cat.liElem = catLi;

//         cat.catSection = DocBuild.div(Object.values(catSectionElems))

//         catLi.addEventListener("click", () => {
//             currentCatContainer.replaceChild(cat.catSection, currentCatContainer.firstChild)
//         })
//     })

//     currentCatContainer.appendChild(cats[0].catSection);
//     catListContainer.appendChild(DocBuild.ul(cats.map(cat => cat.liElem)))
// };
