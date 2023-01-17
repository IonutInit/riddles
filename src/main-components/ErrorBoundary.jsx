//NOU USED!
import {Component} from 'react';

//coverting the warning --No routes matched location "/play"-- into an error
console.warn = function(...args) {
    setTimeout(() => {
      throw new Error(args[0])
    }, 0)
  }

class ErrorBoundary extends Component {

    state = {hasError: false}
    static getDerivedStateFromError() {
        return {hasError: true}
    }

    componentDidCatch(error, info) {
            console.error('Error boundary caugh an error', error, info)       
    }

    render() {
        if (this.state.hasError) {
            return (
                  <h2>Oops, it broke...</h2>               
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;