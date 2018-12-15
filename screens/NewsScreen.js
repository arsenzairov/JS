import React, { Component } from "react";
import NewsFeed from "../components/NewsFeed";

import { connect } from "react-redux";

import { fetchNews } from "../redux/actions/newsactions";

class NewsScreen extends Component {
  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    return <NewsFeed news={this.props.news} />;
  }
}

const mapStateToProps = state => ({
  news: state.newsInfo.news
});

export default connect(
  mapStateToProps,
  { fetchNews: fetchNews }
)(NewsScreen);
