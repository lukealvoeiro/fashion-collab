import React, { Component } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import Autocomplete from "./Autocomplete";

const keys = require("../../config/keys");

const searchClient = algoliasearch(keys.algoliaAppID, keys.algoliaAPIKey);

class SearchBar extends Component {
  state = {};

  render() {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={keys.algoliaIndexName}
      >
        <Configure hitsPerPage={7} />
        <Autocomplete />
      </InstantSearch>
    );
  }
}

export default SearchBar;
