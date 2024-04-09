class UCM {

    constructor(config) {
      this.configuration = config;
      this.ifrm = document.createElement("iframe");
    }
  
    init() {
      this.prepareFrame(this.configuration.elementId);
      return this;
    }
  
    prepareFrame(elementIdToAttachPopup) {
      let container = document.getElementById(`${elementIdToAttachPopup}`);
      this.ifrm.setAttribute("src", "http://localhost:5173/");
      this.ifrm.setAttribute("allowfullscreen", true);
      this.ifrm.setAttribute("allow", "fullscreen");
      this.ifrm.setAttribute("allowtransparency", true);
      this.ifrm.setAttribute("scrolling", "no");
      this.ifrm.style.maxWidth = "inherit";
      this.ifrm.style.maxHeight = "inherit";
      this.ifrm.style.borderWidth = "0px";
      container.appendChild(this.ifrm);
    }
  
    show() {
      this.handleMessage("show");
    }
    hide() {
      this.handleMessage("hide");
    }
  
    handleMessage(action) {
      this.ifrm.contentWindow.postMessage({ action }, "*");
    }
  }
  