import React, { Component } from 'react';

import ExampleComponent from './components/ExampleComponent.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // bind methods here
    }

    // lifecyle methods
    componentWillMount() {
        // code here
    }

    // methods
    sampleMethod() {
        // code here
    }

    render() {
        return (
            <div>
                <h1>Rendering: App component</h1>
                <ExampleComponent/>
            </div>
        )
    }
}

export default App;