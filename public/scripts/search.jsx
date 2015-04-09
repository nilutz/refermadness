var testData = [
  {name: "Test #1", url: "https://test1.com", id: "1"},
  {name: "Test #2", url: "https://example.test2.com", id: "2"},
  {name: "Test #3", url: "https://3test.org", id: "3"},
  {name: "Test #4", url: "https://signup.4test.net/", id: "4"},
  {name: "Test #5", url: "http://testtesttesttesttest.me", id: "5"}
];

var Result = React.createClass({
  viewFull: function() {
    this.props.onSelected(this.props.id);
  },
  render: function() {
    return (
      <div className="search-result col-lg-3 col-md-4 col-sm-6 col-xs-12" onClick={this.viewFull}>
        <h2>
          {this.props.name}
        </h2>
        <h4>
          {this.props.url}
        </h4>
        <h5>
          Some short description here?
        </h5>
      </div>
    );
  }
});

var SearchResults = React.createClass({
  selectResult: function(id) {
    this.props.onResultSelected(id)
  },
  render: function() {
    var that = this;
    var results = this.props.data.map(function (result) {
      return (
        <Result name={result.name} url={result.url} key={result.name} id={result.id} onSelected={that.selectResult} />
      );
    });

    return (
      <div className="search-results row">
        {results}
      </div>
    );
  }
});

var SearchBox = React.createClass({
  onTextChange: function(e) {
    this.props.onSearchTextChange(React.findDOMNode(this.refs.text).value);
  },
  render: function() {
    return (
      <div className="search-box">
        <input type="text" onChange={this.onTextChange} className="form-control input-lg"
               placeholder="Give me a service name or URL!" ref="text" autoFocus />
      </div>
    );
  }
});

var SearchPage = React.createClass({
  getInitialState: function() {
    return {data: [], selected: -1};
  },
  handleSearchTextChange: function(query) {
    query = $.trim(query);
    if (query === "") {
      this.setState({data: []});
      this.props.onEmptySearch();
      return
    }
    this.props.onNonEmptySearch();
    var searchResults = testData.filter(function(val) {
      return val.name.indexOf(query) > -1 || val.url.indexOf(query) > -1;
    });
    this.setState({data: searchResults});
  },
  resultSelected: function(id) {
    this.setState({selected: id})
  },
  render: function() {
    if (this.state.selected === -1) {
      return (
        <div className="search-area">
          <SearchBox onSearchTextChange={this.handleSearchTextChange} ref="searchbox"/>
          <SearchResults data={this.state.data} onResultSelected={this.resultSelected} />
        </div>
      );
    } else {
      return (
        <ServicePage id={this.state.selected} />
      )
    }
  }
});
