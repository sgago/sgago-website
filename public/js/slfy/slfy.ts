
//import $ from "jquery";
//import * as $ from "jquery";
//import $ = require("jquery");


class Slfy {

  private static readonly SLFY_DATA_ID: string = "slfy-data";

  private elements: HTMLCollection = null;
  private timers: ISlfyTimers = new SlfyTimers();

  //private onSlfyStart: (this: void) => void = function () {};
  //private onSlfyType: (this: void) => void = function () {};
  //private onSlfyRemove: (this: void) => void = function () {};
  //private onSlfyInsert: (this: void) => void = function () {};
  //private onSlfyEnd: (this: void) => void = function () {};

  public get Elements() {

    return this.elements;
  }

  public set Elements(elements: HTMLCollection) {

    this.elements = elements;
  }

  private get Timers(): ISlfyTimers {

    return this.timers;
  }

  private set Timers(timers: ISlfyTimers) {

    this.timers = timers;
  }

  constructor (url: string) {
    
    this.initialize(url);
  }

  private static parseNodes(text: string): HTMLCollection {

    return new DOMParser()
      .parseFromString(text, "text/xml")
      .getElementById(Slfy.SLFY_DATA_ID)
      .children;
  }

  private initialize(url: string) {

    $.ajax({
      type: "GET",
      url: url,
      dataType: "text",
      success: (data: string) => {
        this.Elements = Slfy.parseNodes(data);
      }
    });
  }

  private htmlPump(elements: HTMLCollection) {

    let element: Element = null;
    let slfyTree: SlfyTree = null;
    let slfyAttributes: SlfyNodeAttributes = null;

    for (let i = 0; i < elements.length; i++) {

      element = elements[i];

      slfyAttributes = new SlfyNodeAttributes(element);

      if (!slfyAttributes.Ignore) {

        if (slfyAttributes.Mode === Mode.Tree) {

          slfyTree = new SlfyTree(
            element,
            $(slfyAttributes.ContentSelector).get(0)
          );

          this.runTree(slfyTree);
        }
        else {

          this.runElement(element);
        }
      }

    }

  }

  private runElement(element: Element) {

    let attributes: SlfyNodeAttributes = new SlfyNodeAttributes(element);
    let parent = $(attributes.ContentSelector).get(0);
    let slfyNode: SlfyNode = new SlfyNode(element, parent, attributes);

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

  private runTree(tree: SlfyTree) {

    let attributes: ISlfyNodeAttributes = null;
    let parent = null;
    let slfyNode: ISlfyNode = null;

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


  private type(slfyNode: ISlfyNode) {

    for (let i: number = 0; i < slfyNode.TextContent.length; i++) {

      this.Timers.next(
        slfyNode.SlfyAttributes.KeyStrokeDelay,
        () => {
          $(slfyNode.SlfyAttributes.TypingSelector).get(0).innerHTML += slfyNode.TextContent[i];
        },
        false
      )
    }
  }

  private remove(slfyNode: ISlfyNode) {
    
    console.log(slfyNode);
  }

  private append(slfyNode: ISlfyNode) {

    console.log(slfyNode);
  }

  public start() {

    this.htmlPump(this.Elements);

    this.timers.start();
  }

}
