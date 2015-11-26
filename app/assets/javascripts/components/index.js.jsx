var Index = React.createClass ({
  getInitialState: function(){
    return {posts: [], page: 1};
  },

  componentWillMount: function(){
    SessionsApiUtil.fetchCurrentUser();
  },

  componentDidMount: function(){
    ApiUtil.fetchPosts();

    PostStore.addChangeListener(this._changed);
  },

  componentWillUnmount: function(){

    PostStore.removeChangeListener(this._changed);

  },

  _changed: function(){

    this.setState({posts: PostStore.all()});

  },

  handleClick: function(){
    // debugger;

  },

  render: function(){
    return <div className="posts-content-area">
              <ReactRouter.Link className="new-post" to={"/posts/new"}>
                <span >+</span>
              </ReactRouter.Link>
            {this.state.posts.map(function(post){

              return <Post key={post.id} post={post}/>;

            })}
            <div onClick={this.handleClick} className="load-more"></div>
          </div>;
  }

});
