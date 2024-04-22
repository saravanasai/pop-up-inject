class UCM {
  constructor(config) {
    this.configuration = config;
    this.ifrm = document.createElement("iframe");
    this.css =
      ".app-swicther-popup{background:white;border:0;position:fixed;z-index:10000000;}.show {display: block;}.hide {display: none;} iframe {border:none;}";
  }

  init() {
    if (!this.validateConfiguration()) {
      return;
    }
    this.prepareFrame(this.configuration.top, this.configuration.left);
    return this;
  }

  validateConfiguration() {
    let isvalid = true;
    if (!(this.configuration.top && this.configuration.left)) {
      isvalid = false;
      console.error("Postion for popup is missing");
    }

    if (!this.configuration.token) {
      isvalid = false;
      console.error("Token is missing");
    }

    return isvalid;
  }

  prepareFrame(top, left) {
    const styleEl = document.createElement("style");
    styleEl.append(this.css);
    this.ifrm.setAttribute("src", "https://app-switcher.test/");
    this.ifrm.setAttribute("allowfullscreen", true);
    this.ifrm.setAttribute("allow", "fullscreen");
    this.ifrm.setAttribute("scrolling", "no");
    this.ifrm.style.width = "421px";
    this.ifrm.style.height = "500px";
    this.ifrm.style.top = top + "px";
    this.ifrm.style.left = left + "px";
    this.ifrm.style.borderWidth = "0px";
    this.ifrm.style.borderRadius = "4px";
    this.ifrm.classList.add("app-swicther-popup");
    this.ifrm.classList.add("hide");
    document.body.appendChild(styleEl);
    document.body.appendChild(this.ifrm);
  }

  show() {
    this.ifrm.classList.remove("hide");
    this.ifrm.classList.add("show");
    this.handleMessage("show");
  }
  hide() {
    this.ifrm.classList.remove("show");
    this.ifrm.classList.add("hide");
    this.handleMessage("hide");
  }

  handleMessage(action) {
    this.ifrm.contentWindow.postMessage({ action }, "*");
  }
}
