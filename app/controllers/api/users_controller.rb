class Api::UsersController < ApplicationController
  before_action :authenticate!, only: %i[me]
  
  def create
    user = User.new(users_params)
    if user.save
      render json: user
    else
      render jsomn: user.errors, status: :bad_request
    end
  end

  def me 
    render json: current_user
  end

  private

  def users_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end