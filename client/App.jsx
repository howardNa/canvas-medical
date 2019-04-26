import React, { Component } from 'react';
import './styles/App.scss';

import SearchBar from './components/SearchBar.js';
import PopularSearchBox from './components/PopularSearchBox.js';
import ResultsBox from './components/ResultsBox.js';
import AltBox from './components/AltBox.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            searchResponse: [],
            altList: [],
            popularSearches: {}
        };

        // bind methods here
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.listOptions = this.listOptions.bind(this);
    }

    // lifecyle methods
    componentDidMount() {

    }

    componentDidUpdate() {
            // console.log('popularSearches: ', this.state.popularSearches)
    }

    // methods
    handleChange(e) {
        this.setState({input: e.target.value})
    }

    handleSearch(e) {
        const code = e.keyCode || e.which;
        if (code === 13) {
            const { input } = this.state;
            const { popularSearches } = this.state

            fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${input}`)
                .then(res => res.json())
                .then(data => this.setState({searchResponse: data.drugGroup.conceptGroup}))
                .catch(err => console.log(err))

            if (!popularSearches[input]) {
                popularSearches[input] = 1;
            } else {
                popularSearches[input]++;
            }
        }
    }

    listOptions(e) {
        const refID = e.target.getAttribute('rxcui');

        //GET request to find ingredient ID
        fetch(`https://rxnav.nlm.nih.gov/REST/rxcui/${refID}/related.json?tty=IN`)
            .then(res => res.json())
            .then(data => {
                const ingredient = data.relatedGroup.conceptGroup[0].conceptProperties[0].name;
                const ingredientID = data.relatedGroup.conceptGroup[0].conceptProperties[0].rxcui;
                console.log('ingredients: ', ingredient)
                console.log('rxcui: ', ingredientID)

                //GET request to find alternatives
                fetch(`https://rxnav.nlm.nih.gov/REST/rxcui/${ingredientID}/related.json?tty=SCD+SBD`)
                    .then(res => res.json())
                    .then(data => {
                        const conceptGroup = data.relatedGroup.conceptGroup;
                        let optionsArray = [];

                        conceptGroup.forEach(el => {
                            if (el.conceptProperties) {
                                optionsArray = optionsArray.concat(el.conceptProperties)
                            }
                        })
                        // console.log('optionsArray: ', optionsArray);
                        this.setState({altList: optionsArray})

                    })
            })
    }

    render() {
        return (
            <div>
                <SearchBar handleChange={this.handleChange} handleSearch={this.handleSearch} />
                <PopularSearchBox popularSearches={this.state.popularSearches} />
                <ResultsBox searchResponse={this.state.searchResponse} listOptions={this.listOptions} />
                <AltBox altList={this.state.altList} />
            </div>
        )
    }
}

export default App;