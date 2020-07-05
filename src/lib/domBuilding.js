"use strict";

class DocBuild {
    static h(number, innerHTML) {
        const h0 = document.createElement("h" + number)
        h0.innerHTML = innerHTML;
        return h0
    }
    static h1(innerHTML) {
        return DocBuild.h(1, innerHTML)
    }
    static h2(innerHTML) {
        return DocBuild.h(2, innerHTML)
    }

    static span(innerHTML) {
        const span0 = document.createElement("span")
        span0.innerText = innerHTML;
        return span0
    }
    static div(elems) {
        const div0 = document.createElement("div")
        elems.forEach(elem => div0.appendChild(elem));
        return div0
    }
    static ul(elems) {
        const ul0 = document.createElement("ul")
        elems.forEach(elem => {
            const li0 = document.createElement("li")
            li0.appendChild(elem)
            ul0.appendChild(li0)
        });
        return ul0
    }

    static img(src, alt, callBack_elem) {
        const elem = document.createElement("img")
        elem.alt = alt;
        elem.src = src;
        console.log("coucou")
        if (callBack_elem)
            callBack_elem(elem);
        return elem
    }

    static navlistItemsFragment(objs, objToLiChild, objAndLi_Consumer) {
        const catlist = document.createDocumentFragment();
        objs.forEach(obj => {
            const catLi = DocBuild.navLi(objToLiChild(obj));
            catlist.appendChild(catLi);
            objAndLi_Consumer(obj, catLi);
        })
        return catlist
    }
    static navLi(child) {
        const liElem = document.createElement("li");
        if (typeof child === "string")
            liElem.textContent = child;
        else liElem.appendChild(child);
        liElem.style.cursor = "pointer";
        return liElem;
    }
}
module.exports = DocBuild;