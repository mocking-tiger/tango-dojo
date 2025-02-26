type AlertType = "alert" | "confirm";

export function useAlert() {
  const show = (message: string, type: AlertType, onConfirm: () => void) => {
    if (type === "alert") {
      alert(message);
    } else if (type === "confirm") {
      const confirmMessage = confirm(message);
      if (!confirmMessage) return;
    }
    onConfirm();
  };

  return { show };
}
