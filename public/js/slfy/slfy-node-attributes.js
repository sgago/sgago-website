"use strict";
var Mode;
(function (Mode) {
    Mode["Normal"] = "NORMAL";
    Mode["Tree"] = "TREE";
})(Mode || (Mode = {}));
;
class SlfyNodeAttributes {
    constructor(element) {
        this.element = null;
        this.Element = element;
    }
    get Element() {
        return this.element;
    }
    set Element(node) {
        this.element = node;
    }
    getBooleanAttributeValue(name, defaultValue) {
        let value = defaultValue;
        if (this.Element.getAttribute(name) !== null) {
            value = true;
        }
        return value;
    }
    getStringAttributeValue(name, defaultValue) {
        let value = this.Element.getAttribute(name);
        ;
        if (value === null) {
            value = defaultValue;
        }
        return value;
    }
    getNumberAttributeValue(name, defaultValue) {
        return Number.parseInt(this.getStringAttributeValue(name, defaultValue.toString()));
    }
    get Mode() {
        let mode = Mode.Normal;
        let value = this.getStringAttributeValue(SlfyNodeAttributes.MODE_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_MODE.toString());
        if (value.toLowerCase() === "tree") {
            mode = Mode.Tree;
        }
        return mode;
    }
    get ContentSelector() {
        return this.getStringAttributeValue(SlfyNodeAttributes.CONTENT_SELECTOR_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_CONTENT_SELECTOR);
    }
    get TypingSelector() {
        return this.getStringAttributeValue(SlfyNodeAttributes.TYPING_SELECTOR_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_TYPING_SELECTOR);
    }
    get RunTyping() {
        return this.getBooleanAttributeValue(SlfyNodeAttributes.RUN_TYPING_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_RUN_TYPING);
    }
    get RunRemove() {
        return this.getBooleanAttributeValue(SlfyNodeAttributes.RUN_REMOVE_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_RUN_REMOVE);
    }
    get RunInsert() {
        return this.getBooleanAttributeValue(SlfyNodeAttributes.RUN_INSERT_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_RUN_INSERT);
    }
    get IsVerbose() {
        return this.getBooleanAttributeValue(SlfyNodeAttributes.VERBOSITY_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_VERBOSITY);
    }
    get Ignore() {
        return this.getBooleanAttributeValue(SlfyNodeAttributes.IGNORE_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_IGNORE);
    }
    get StartDelay() {
        return this.getNumberAttributeValue(SlfyNodeAttributes.START_DELAY_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_START_DELAY);
    }
    get KeyStrokeDelay() {
        return this.getNumberAttributeValue(SlfyNodeAttributes.KEY_STROKE_DELAY_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_KEY_STROKE_DELAY);
    }
    get RemoveDelay() {
        return this.getNumberAttributeValue(SlfyNodeAttributes.REMOVE_DELAY_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_REMOVE_DELAY);
    }
    get InsertDelay() {
        return this.getNumberAttributeValue(SlfyNodeAttributes.INSERT_DELAY_ATTRIBUTE, SlfyNodeAttributes.DEFAULT_INSERT_DELAY);
    }
}
// Attribute name constants
SlfyNodeAttributes.MODE_ATTRIBUTE = "data-slfy-mode";
SlfyNodeAttributes.CONTENT_SELECTOR_ATTRIBUTE = "data-slfy-content-selector";
SlfyNodeAttributes.TYPING_SELECTOR_ATTRIBUTE = "data-slfy-typing-selector";
SlfyNodeAttributes.RUN_TYPING_ATTRIBUTE = "data-slfy-type";
SlfyNodeAttributes.RUN_REMOVE_ATTRIBUTE = "data-slfy-remove";
SlfyNodeAttributes.RUN_INSERT_ATTRIBUTE = "data-slfy-insert";
SlfyNodeAttributes.IGNORE_ATTRIBUTE = "data-slfy-ignore";
SlfyNodeAttributes.VERBOSITY_ATTRIBUTE = "data-slfy-verbose";
SlfyNodeAttributes.START_DELAY_ATTRIBUTE = "data-slfy-start-delay";
SlfyNodeAttributes.KEY_STROKE_DELAY_ATTRIBUTE = "data-slfy-key-stroke-delay";
SlfyNodeAttributes.REMOVE_DELAY_ATTRIBUTE = "data-slfy-remove-delay";
SlfyNodeAttributes.INSERT_DELAY_ATTRIBUTE = "data-slfy-insert-delay";
// Default attribute constants
SlfyNodeAttributes.DEFAULT_MODE = Mode.Normal;
SlfyNodeAttributes.DEFAULT_CONTENT_SELECTOR = "body";
SlfyNodeAttributes.DEFAULT_TYPING_SELECTOR = "body";
SlfyNodeAttributes.DEFAULT_RUN_TYPING = true;
SlfyNodeAttributes.DEFAULT_RUN_REMOVE = true;
SlfyNodeAttributes.DEFAULT_RUN_INSERT = true;
SlfyNodeAttributes.DEFAULT_IGNORE = false;
SlfyNodeAttributes.DEFAULT_VERBOSITY = false;
SlfyNodeAttributes.DEFAULT_START_DELAY = 1000;
SlfyNodeAttributes.DEFAULT_KEY_STROKE_DELAY = 40;
SlfyNodeAttributes.DEFAULT_REMOVE_DELAY = 40;
SlfyNodeAttributes.DEFAULT_INSERT_DELAY = 0;
//# sourceMappingURL=slfy-node-attributes.js.map