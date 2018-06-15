"use strict";
class Slfy {
    parseNodes(text) {
        return new DOMParser()
            .parseFromString(text, "text/xml")
            .getElementById(Slfy.SLFY_DATA_ID)
            .children;
    }
}
Slfy.SLFY_DATA_ID = "slfy-data";
//# sourceMappingURL=slfy.js.map