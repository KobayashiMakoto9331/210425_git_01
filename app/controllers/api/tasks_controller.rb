class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate!
  before_action :set_task, only: %i[show update destroy]

  def index
    @tasks = current_user.tasks
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors, status: :bad_request
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :bad_request
    end
  end

  def destroy
    @task.destroy!
    render json: @task
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :status, :user_id)
  end
end
