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
        if (elems instanceof DocumentFragment)
            div0.appendChild(elems)
        else elems.forEach(elem => div0.appendChild(elem));
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
    static makeButton(innerHTML) {
        const button = document.createElement("button");
        button.innerHTML = innerHTML;
        return button;
    }
}

// class DataSourceWithDefault {
//     constructor(dataDefaultValue) {
//         this.dataDefaultValue = dataDefaultValue;
//     }
//     set data(data) {
//         this.data = data;
//     }
//     get data() {
//         return this.data || this.dataDefaultValue;
//     }
// }

class FormInput {
    constructor() {
        this.input = document.createElement("input");
    }
    setValue(value) {
        this.input.value = value;
    }
    getValue() {
        return this.input.value;
    }
    getDomNode() {
        return this.input;
    }
}
class FormFactory {
    constructor(submittedkeyDataPairsConsumer) {
        this.submitButtonActionBinder = submitButton => keyDataPairsSupplier =>
            submitButton.addEventListener("click",
                () => submittedkeyDataPairsConsumer(keyDataPairsSupplier())
            )

        this.labelAndKeyPairs = [];
        this.submitButtonInnerHTML = "Submit";
        this.cancelButtonInnerHTML = "Cancel";
        this.submitButtonBuilder = () => DocBuild.makeButton(this.submitButtonInnerHTML);
        this.cancelButtonBuilder = () => DocBuild.makeButton(this.cancelButtonInnerHTML);

        this.labelDomNodeBuilder = str => DocBuild.span(str);
        this.formInputSupplier = () => new FormInput();
    }
    addFieldConfig(label, key = label) {
        this.labelAndKeyPairs.push({ label, key });
    }

    onCancel(formInputsConsumer) {
        this.cancelButtonActionBinder = cancelButton => formInputsSupplier =>
            cancelButton.addEventListener("click", () => formInputsConsumer(formInputsSupplier()))
    }
    build() {
        const labelAndInputDomNodes = this.labelAndKeyPairs.map(field => {
            return {
                key: field.key,
                labelDomNode: this.labelDomNodeBuilder(field.label),
                formInput: this.formInputSupplier()
            }
        })
        const submitButton = this.submitButtonBuilder()
        this.submitButtonActionBinder(submitButton)(() =>
            labelAndInputDomNodes.map(elem => ({
                key: elem.key,
                data: elem.formInput.getValue()
            }))
        )
        let cancelButton;
        if (this.cancelButtonActionBinder) {
            cancelButton = this.cancelButtonBuilder();
            this.cancelButtonActionBinder(cancelButton)(() =>
                labelAndInputDomNodes.map(elem => elem.formInput)
            )
        }
        return {
            labelAndInputDomNodes,
            submitButton,
            cancelButton
        }
    }
}

module.exports = { DocBuild, FormFactory };