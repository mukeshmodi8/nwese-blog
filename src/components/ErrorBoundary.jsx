// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Ad Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for errors
      return (
        <div style={{ color: "red", textAlign: "center", margin: "20px" }}>
          ⚠️ कोई Error आया है, Ad load नहीं हो सका।
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
