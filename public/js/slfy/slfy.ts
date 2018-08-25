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
      async: false,
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

    slfyNode.SlfyContent = slfyNode.OuterHtml;

    if (attributes.RunTyping) {
      this.type(slfyNode);
    }

    if (attributes.RunRemove) {
      this.remove(slfyNode);
    }

    if (attributes.RunInsert) {
      this.insert(slfyNode);
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
        this.insert(slfyNode);
      }
    }
  }


  private type(slfyNode: ISlfyNode) {

    for (let i: number = 0; i < slfyNode.SlfyContent.length; i++) {

      this.Timers.next(
        slfyNode.SlfyAttributes.KeyStrokeDelay,
        () => {
          let element = $(slfyNode.SlfyAttributes.TypingSelector).get(0);
          element.innerHTML += slfyNode.Escape(slfyNode.SlfyContent[i]);
        },
        false
      );
    }
  }

  private remove(slfyNode: ISlfyNode) {

    this.Timers.next(

      slfyNode.SlfyAttributes.RemoveDelay,
      () => {

        let element = $(slfyNode.SlfyAttributes.TypingSelector).get(0);

        element.innerHTML = element.innerHTML.slice(0, element.innerHTML.length - slfyNode.EscapedOuterHtml.length);
      },
      false
    );
  }

  private insert(slfyNode: ISlfyNode) {

    this.Timers.next(

      slfyNode.SlfyAttributes.InsertDelay,
      () => {

        //let element = $(slfyNode.SlfyAttributes.TypingSelector).get(0);

        $(slfyNode.SlfyAttributes.TypingSelector).append(slfyNode.OuterHtml);
      },
      false
    );
  }

  public start() {

    this.htmlPump(this.Elements);

    this.timers.start();
  }

}
