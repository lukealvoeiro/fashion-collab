import React, { Component, Fragment } from "react";
import { connectAutoComplete, connectHighlight } from "react-instantsearch-dom";
import AutoSuggest from "react-autosuggest";
import { withRouter } from "react-router-dom";

const Highlight = ({ highlight, attribute, hit, profileImg }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });
  const imgUrl = {
    backgroundImage: `url("${hit.profileImg}")`,
    height: 25,
    width: 25,
  };
  const imgTag = <i className="fas circle-img" style={imgUrl}></i>;
  return (
    <div className="center-background-img">
      {imgTag}
      <span style={{ paddingLeft: "0.3rem" }}>
        {parsedHit.map((part, index) =>
          part.isHighlighted ? (
            <span key={index}>{part.value}</span>
          ) : (
            <span style={{ fontWeight: "700" }} key={index}>
              {part.value}
            </span>
          )
        )}
      </span>
    </div>
  );
};

const CustomHighlight = connectHighlight(Highlight);

class Autocomplete extends Component {
  state = {
    value: this.props.currentRefinement,
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    return hit.name;
  }

  onSuggestionSelected = (event, { suggestion }) => {
    const { history } = this.props;
    if (suggestion) {
      history.push("/u/" + suggestion.id);
    }
  };

  renderSuggestion(suggestion, obj) {
    return <CustomHighlight hit={suggestion} attribute="name" />;
  }

  render() {
    const { hits } = this.props;
    const { value } = this.state;

    const inputProps = {
      placeholder: "Who are you looking for?",
      onChange: this.onChange,
      value,
    };

    return (
      <AutoSuggest
        suggestions={hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connectAutoComplete(withRouter(Autocomplete));
