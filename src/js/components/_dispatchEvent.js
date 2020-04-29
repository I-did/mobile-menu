// arguments: element, eventName
if (typeof window.CustomEvent === "function") {
  let evt = new CustomEvent(eventName);
  element.dispatchEvent(evt);
} 