import { useEffect, useState } from 'react';

const PREFIX = 'chats-';

export const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    return typeof initialValue === 'function'
      ? initialValue()
      : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
};
