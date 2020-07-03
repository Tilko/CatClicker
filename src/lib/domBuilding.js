

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
        span0.innerHTML = innerHTML;
        return span0
    }
    static div(elems) {
        const div0 = document.createElement("div")
        elems.forEach(elem => div0.appendChild(elem));
        return div0
    }

    static img(src, alt, callBack_elem) {
        const elem = document.createElement("img")
        elem.alt = alt;
        elem.src = src;
        if (callBack_elem)
            callBack_elem(elem);
        return elem
    }
}
module.exports = DocBuild;