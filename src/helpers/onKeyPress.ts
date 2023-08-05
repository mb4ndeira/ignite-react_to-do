const onKeyPress =
  (key: string, func?: () => void) => (e: React.KeyboardEvent) => {
    if (e.key !== key) return;

    return func?.();
  };

export default onKeyPress;
