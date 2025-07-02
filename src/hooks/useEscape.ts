import { useEffect, useCallback } from 'react';

export const useEscape = (handleClose: () => void): void => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEscape, false);

    return (): void => document.removeEventListener('keyup', handleEscape, false);
  }, [handleEscape]);
};
