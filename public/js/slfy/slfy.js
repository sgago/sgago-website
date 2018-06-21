"use strict";
//import $ from "jquery";
//import * as $ from "jquery";
//import $ = require("jquery");
class Slfy {
    constructor(url) {
        this.elements = null;
        this.timers = new SlfyTimers();
        this.initialize(url);
    }
    //private onSlfyStart: (this: void) => void = function () {};
    //private onSlfyType: (this: void) => void = function () {};
    //private onSlfyRemove: (this: void) => void = function () {};
    //private onSlfyInsert: (this: void) => void = function () {};
    //private onSlfyEnd: (this: void) => void = function () {};
    get Elements() {
        return this.elements;
    }
    set Elements(elements) {
        this.elements = elements;
    }
    get Timers() {
        return this.timers;
    }
    set Timers(timers) {
        this.timers = timers;
    }
    static parseNodes(text) {
        return new DOMParser()
            .parseFromString(text, "text/xml")
            .getElementById(Slfy.SLFY_DATA_ID)
            .children;
    }
    initialize(url) {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "text",
            success: (data) => {
                this.Elements = Slfy.parseNodes(data);
            }
        });
    }
    htmlPump(elements) {
        let element = null;
        let slfyTree = null;
        let slfyAttributes = null;
        for (let i = 0; i < elements.length; i++) {
            element = elements[i];
            slfyAttributes = new SlfyNodeAttributes(element);
            if (!slfyAttributes.Ignore) {
                if (slfyAttributes.Mode === Mode.Tree) {
                    slfyTree = new SlfyTree(element, $(slfyAttributes.ContentSelector).get(0));
                    this.runTree(slfyTree);
                }
                else {
                    this.runElement(element);
                }
            }
        }
    }
    runElement(element) {
        let attributes = new SlfyNodeAttributes(element);
        let parent = $(attributes.ContentSelector).get(0);
        let slfyNode = new SlfyNode(element, parent, attributes);
        if (attributes.RunTyping) {
            this.type(slfyNode);
        }
        if (attributes.RunRemove) {
            this.remove(slfyNode);
        }
        if (attributes.RunInsert) {
            this.append(slfyNode);
        }
    }
    runTree(tree) {
        let attributes = null;
        let parent = null;
        let slfyNode = null;
        for (let i = 0; i < tree.Tree.length; i++) {
            attributes = tree.Tree[i].SlfyAttributes;
            slfyNode = tree.Tree[i];
            if (attributes.RunTyping) {
                this.type(slfyNode);
            }
            if (attributes.RunRemove) {
                this.remove(slfyNode);
            }
            if (attributes.RunInsert) {
                this.append(slfyNode);
            }
        }
    }
    type(slfyNode) {
        for (let i = 0; i < slfyNode.TextContent.length; i++) {
            this.Timers.next(slfyNode.SlfyAttributes.KeyStrokeDelay, () => {
                $(slfyNode.SlfyAttributes.TypingSelector).get(0).innerHTML += slfyNode.TextContent[i];
            }, false);
        }
    }
    remove(slfyNode) {
        console.log(slfyNode);
    }
    append(slfyNode) {
        console.log(slfyNode);
    }
    start() {
        this.htmlPump(this.Elements);
        this.timers.start();
    }
}
Slfy.SLFY_DATA_ID = "slfy-data";
//# sourceMappingURL=slfy.js.map