import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    
    console.error("Ad Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      
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
