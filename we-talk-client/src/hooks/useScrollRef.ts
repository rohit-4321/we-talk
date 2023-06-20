import { useCallback, useRef } from 'react';

const SCROLL_END_MIN_VALUE = 10;
const useScrollRef = <T extends HTMLElement>(
  SCROLL_THRESHHOLD = 100,
): {
    ref: React.RefObject<T>;
    scrollBottom: () => void;
    scrollToTop: () => void;
    scrollBottomUnderThreshold: (onOverThreshold: () => void, onScrollBottom: () => void) => void;
    onScrollEndListener: (callback: () => void) => () => void
  } => {
  const ref = useRef<T>(null);

  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, []);

  const scrollBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
    }
  }, []);

  const onScrollEndListener = useCallback(((callback: () => void, endValue = 10) => {
    const handleOnScroll = () => {
      if (ref.current) {
        const { scrollHeight } = ref.current;
        const { clientHeight } = ref.current;
        const { scrollTop } = ref.current;
        if (scrollTop >= scrollHeight - clientHeight - Math.max(SCROLL_END_MIN_VALUE, endValue)) {
          callback();
        }
      }
    };
    ref.current?.addEventListener('scroll', handleOnScroll);
    return () => {
      ref.current?.removeEventListener('scroll', handleOnScroll);
    };
  }), []);

  const scrollBottomUnderThreshold = useCallback((
    onOverThreshold?: () => void,
    onScrollBottom?: () => void,
  ) => {
    if (ref.current) {
      const { scrollHeight } = ref.current;
      const { clientHeight } = ref.current;
      if (ref.current.scrollTop <= scrollHeight - clientHeight - SCROLL_THRESHHOLD) {
        if (onOverThreshold) {
          onOverThreshold();
        }
      } else {
        ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
        if (onScrollBottom) {
          onScrollBottom();
        }
      }
    }
  }, [SCROLL_THRESHHOLD]);

  return {
    ref,
    scrollBottom,
    scrollToTop,
    scrollBottomUnderThreshold,
    onScrollEndListener,
  };
};
export default useScrollRef;
