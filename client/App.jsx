import React, { Component } from 'react';
import './styles/App.scss';

import ExampleComponent from './components/ExampleComponent.js';
import SearchBar from './components/SearchBar.js';
import ResultsBox from './components/ResultsBox.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            searchResponse: []
        };

        // bind methods here
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // lifecyle methods
    componentDidMount() {
        //search: alavert

        // fetch('https://rxnav.nlm.nih.gov/REST/drugs.json?name=alavert')
        //     .then(res => res.json())
        //     .then(data => console.log(data))

        //choose: Alavert 10MG Oral Tablet
        // fetch('https://rxnav.nlm.nih.gov/REST/rxcui/28889/related.json?tty=SCD+SBD')
        //     .then(res => res.json())
        //     .then(data => console.log(data))

    }

    componentDidUpdate() {
            console.log(this.state.searchResponse)
    }

    // methods
    handleChange(e) {
        this.setState({input: e.target.value})
    }

    handleSearch(e) {
        const code = e.keyCode || e.which;
        if (code === 13) {
            let searchInput = this.state.input;

            fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchInput}`)
                .then(res => res.json())
                .then(data => this.setState({searchResponse: data.drugGroup.conceptGroup}))
        }
    }

    render() {
        return (
            <div>
                <SearchBar handleChange={this.handleChange} handleSearch={this.handleSearch} />
                <ResultsBox />
            </div>
        )
    }
}

export default App;