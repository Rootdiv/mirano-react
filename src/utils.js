export const getValidFilters = filters => {
  const validFilters = {};
  for (const key in filters) {
    if (filters[key] && key !== 'typeName') {
      validFilters[key] = filters[key];
    }
  }
  return validFilters;
};

export const debounce = (fn, msec) => {
  let lastCall = 0;
  let lastCallTimeout = 0;

  return (...args) => {
    const prevCall = lastCall;
    lastCall = Date.now();
    if (prevCall && lastCall - prevCall <= msec) {
      clearTimeout(lastCallTimeout);
    }
    lastCallTimeout = setTimeout(() => {
      fn(...args);
    }, msec);
  };
};

export const adjustElementPosition = (element, count = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  if (rect.left < 0) {
    element.style.left = '0';
    element.style.right = 'auto';
    element.style.transform = 'translateX(0)';
  } else if (rect.right > viewportWidth) {
    element.style.left = 'auto';
    element.style.right = '0';
    element.style.transform = 'translateX(0)';
  } else {
    element.removeAttribute('style');
  }

  const postRect = element.getBoundingClientRect();
  if ((postRect.left < 0 || postRect.right > viewportWidth) && count < 3) {
    count++;
    adjustElementPosition(element, count);
  }
};
