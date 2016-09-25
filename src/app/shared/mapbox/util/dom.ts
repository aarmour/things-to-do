const document = window['document'];

export function createButton(className, container, fn) {
  const el = createElement('button', className, container);

  el.type = 'button';
  el.addEventListener('click', () => fn());

  return el;
}

export function createElement(tagName, className, container) {
  const el = document.createElement(tagName);

  if (className) el.className = className;
  if (container) container.appendChild(el);

  return el;
}
