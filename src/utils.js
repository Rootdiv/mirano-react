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
