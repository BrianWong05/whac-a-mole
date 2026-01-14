import { useEffect } from 'react';

export const useScrollLock = () => {
  useEffect(() => {
    // Save original styles
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalOverscrollBehavior = originalStyle.overscrollBehavior;
    const originalUserSelect = originalStyle.userSelect;
    const originalWebkitUserSelect = originalStyle.webkitUserSelect;

    // Apply lock styles
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none'; // For Safari

    // Cleanup function to restore original styles
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscrollBehavior;
      document.body.style.userSelect = originalUserSelect;
      document.body.style.webkitUserSelect = originalWebkitUserSelect;
    };
  }, []); // Run only on mount and unmount
};
