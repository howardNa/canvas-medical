import React, { Component } from "react";

import SearchBar from "./components/SearchBar.js";
import PopularSearchBox from "./components/PopularSearchBox.js";
import ResultsBox from "./components/ResultsBox.js";
import AltBox from "./components/AltBox.js";
import "./styles/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      searchResponse: [],
      altList: [],
      ingredient: "",
      popularSearches: {},
      isFetching: false,
      isFetchingAlt: false,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.listOptions = this.listOptions.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSearch(e) {
    const code = e.keyCode || e.which;
    if (code === 13) {
      this.setState({
        isFetching: true,
        searchResponse: [],
        altList: [],
        error: false
      });

      const { input } = this.state;
      const { popularSearches } = this.state;

      setTimeout(() => {
        fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${input}`)
          .then(res => res.json())
          .then(data => {
            const successResponse = data.drugGroup.conceptGroup;

            if (!successResponse) {
              this.setState({ error: true, isFetching: false });
            } else if (successResponse) {
              this.setState({
                searchResponse: successResponse,
                isFetching: false
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 700);

      if (!popularSearches[input]) {
        popularSearches[input] = 1;
      } else {
        popularSearches[input]++;
      }
    }
  }

  listOptions(e) {
    const refID = e.target.getAttribute("rxcui");

    this.setState({ isFetchingAlt: true, altList: [], ingredient: "" });

    //GET request to find ingredient ID
    fetch(`https://rxnav.nlm.nih.gov/REST/rxcui/${refID}/related.json?tty=IN`)
      .then(res => res.json())
      .then(data => {
        const ingredient =
          data.relatedGroup.conceptGroup[0].conceptProperties[0].name;
        this.setState({ ingredient: ingredient });
        const ingredientID =
          data.relatedGroup.conceptGroup[0].conceptProperties[0].rxcui;
        console.log("ingredients: ", ingredient);
        console.log("rxcui: ", ingredientID);

        //GET request to find alternatives
        fetch(
          `https://rxnav.nlm.nih.gov/REST/rxcui/${ingredientID}/related.json?tty=SCD+SBD`
        )
          .then(res => res.json())
          .then(data => {
            const conceptGroup = data.relatedGroup.conceptGroup;
            let optionsArray = [];

            conceptGroup.forEach(el => {
              if (el.conceptProperties) {
                optionsArray = optionsArray.concat(el.conceptProperties);
              }
            });
            this.setState({ altList: optionsArray, isFetchingAlt: false });
          });
      });
  }

  render() {
    const loader = <div className="loader" />;
    const errorMessage = (
      <p className="error-message">Please enter a valid search term</p>
    );

    return (
      <div className="grid-container">
        <div className="nav-container">
          <img src="https://canvasmedical.com/assets/img/logo-blue.svg" />
        </div>
        <div className="search-container">
          <SearchBar
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
          />
          {this.state.error ? errorMessage : " "}
        </div>
        <div className="popular-container">
          <PopularSearchBox popularSearches={this.state.popularSearches} />
        </div>
        <div className="results-header">
          {this.state.isFetching === true ? loader : ""}
        </div>
        <div className="alt-header">
          {this.state.isFetchingAlt === true ? loader : this.state.ingredient}
        </div>
        <div className="results-container">
          {this.state.searchResponse === undefined ||
          this.state.searchResponse.length === 0 ? (
            ""
          ) : (
            <ResultsBox
              searchResponse={this.state.searchResponse}
              listOptions={this.listOptions}
            />
          )}
        </div>
        <div className="alt-container">
          {this.state.altList === undefined ||
          this.state.altList.length === 0 ? (
            ""
          ) : (
            <AltBox altList={this.state.altList} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
