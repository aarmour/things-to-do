const document = window['document'];

export function createElement(tagName, className, container) {
  const el = document.createElement(tagName);

  if (className) el.className = className;
  if (container) container.appendChild(el);

  return el;
}
