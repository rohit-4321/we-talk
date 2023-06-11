import { useCallback, useRef } from 'react';

const useScrollRef = <T extends HTMLElement>(): [React.RefObject<T>, () => void, () => void] => {
  const ref = useRef<T>(null);
  const scrollTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, []);

  const scrollBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, []);
  return [ref, scrollTop, scrollBottom];
};
export default useScrollRef;
