import { useEffect } from "react";

const PreventBackButton = () => {
  useEffect(() => {
    // Push a new state into history to prevent going back
    window.history.pushState(null, document.title, window.location.href);

    // Add event listener to listen to popstate event (when user tries to navigate back)
    const preventBack = () => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener("popstate", preventBack);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, []);

  return null; // No UI element, just block the back button
};

export default PreventBackButton;
