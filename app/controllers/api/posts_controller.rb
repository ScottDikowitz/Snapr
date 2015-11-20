class Api::PostsController < ApplicationController

  def index
    @posts = (current_user.followed_users_posts + current_user.posts).sort_by!{
      |post| post.created_at}.reverse!
    render :index
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    if @post.save
      render json: @post.to_json
    end

  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  private
  def post_params
    self.params.require(:post).permit(:caption, :user_id, :image)
  end

end
