chrome.devtools.panels.create(
  "My Devtools Panel",
  '',
  "devtools/panel.html",
  (panel) => {
    console.log("user switched to this panel", panel)
  }
)
