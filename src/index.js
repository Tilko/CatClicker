"use strict";
const { DocBuild, FormFactory } = require("./lib/domBuilding");


const index = function () {
    const catListDomNode = document.querySelector("#catListContainer")
    const imgDomNode = document.querySelector(".catImg")
    const clickCountSpan = document.querySelector(".clickCount")
    const titleDomNode = document.querySelector(".currentCatContainerTitle")
    const adminButton = document.querySelector(".adminButton")
    const catAddForm = document.querySelector(".catAddForm")

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
        addCat(cat) {
            this.cats.push(cat);
        }
    }
    const octopus = {
        init() {
            model.init();
            this.currentCat = model.cats[0];
            catListView.render(model.cats);

            imgDomNode.addEventListener("click",
                () => currentCatSectionView.renderClickCount(++this.currentCat.clickCount));
            currentCatSectionView.render(this.currentCat)

            const formFacto = new FormFactory(submittedKeyDataPairs => {
                let cat = {};  //"const" => error (?!?)
                for (const keyDataPair of submittedKeyDataPairs)
                    cat[keyDataPair.key] = keyDataPair.data;
                model.addCat(cat);
                catListView.render(model.cats);
            });
            formFacto.addFieldConfig("Name", "name");
            formFacto.addFieldConfig("ImgURL", "src");
            formFacto.addFieldConfig("#Clicks", "clickCount");
            formFacto.onCancel(formInputs => {
                catAddForm.style.visibility = "hidden";
                formInputs.forEach(fi => fi.setValue(""))
            })
            catAddFormView.init(formFacto.build());

            adminButton.addEventListener("click", () => {
                catAddForm.style.visibility = "visible";
            });
            //https://placekitten.com/200/300
        }
    }
    const catAddFormView = {
        init({
            labelAndInputDomNodes,
            submitButton,
            cancelButton
        }) {
            catAddForm.style.visibility = "hidden";
            labelAndInputDomNodes.forEach(labelAndInputDomNode => {
                const { labelDomNode, formInput } = labelAndInputDomNode;
                catAddForm.appendChild(labelDomNode)
                catAddForm.appendChild(formInput.getDomNode())
            })
            catAddForm.appendChild(cancelButton)
            catAddForm.appendChild(submitButton)
        }
    }
    const catListView = {
        render(cats) {
            const newListDiv = DocBuild.div(DocBuild.navlistItemsFragment(
                model.cats,
                cat => cat.name,
                (cat, li) => li.addEventListener("click", () => {
                    currentCatSectionView.render(octopus.currentCat = cat)
                })
            ))
            if (catListDomNode.childElementCount !== 0)
                catListDomNode.replaceChild(newListDiv, catListDomNode.firstChild)
            else catListDomNode.appendChild(newListDiv)
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

// an admin button
// an admin area with inputs for changing the cat's name, url, and number of clicks (hidden by default)


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
