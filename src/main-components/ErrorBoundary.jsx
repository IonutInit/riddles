//Converts the warning but doesn't route!!!
import { Component } from "react";

import { clientPath } from "../lib/path";

import "./ErrorBoundary.css";

//coverting the warning --No routes matched location "/play"-- into an error
console.warn = function (...args) {
  setTimeout(() => {
    throw new Error(args[0]);
  }, 0);
};

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error boundary caugh an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="boundary-container">
          <h2>Oops, something went wrong...</h2>
          <br></br>
          <a href={`${clientPath}`}>
            <button className="boundary-button">Let's try again</button>
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
