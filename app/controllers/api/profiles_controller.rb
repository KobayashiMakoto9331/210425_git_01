class Api::ProfilesController < ApplicationController
  before_action :authenticate!
  def update
    user = User.find_by(id: current_user.id)
    if user.update(users_params)
      render json: user, methods: :avatar_url
    else
      render json: user.errors
    end
  end

  private

  def users_params
    params.require(:user).permit(:name, :avatar)
  end
end
