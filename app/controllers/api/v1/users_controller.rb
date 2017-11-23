module Api
  module V1
    class UsersController < ApplicationController

      def index
        users = User.order('created_at DESC')
        render json: {status:"SUCCESS", message: "Users loaded", data:users}, status: :ok
      end

      def show
        user =User.find(params[:id])
        render json: {status:"SUCCESS", message: "User id=#{params[:id]} loaded", data:user}, status: :ok
      end

      def create
        user = User.new(user_params_post)
        if user.save
          render json: {status:"SUCCESS", message: "Saved user", data:user}, status: :ok
        else
          render json: {status:"ERROR", message: "User not saved", data:user.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        user = User.find(params[:id])
        if  user.destroy
          render json: {status:"SUCCESS", message: "User deleted", data:user}, status: :ok
        else
          render json: {status:"ERROR", message: "User was not deleted", data:user.errors}, status: :not_found
        end
      end

      def update
        user = User.find(params[:id])
        if  user.update_attributes(user_params_put)
          render json: {status:"SUCCESS", message: "Update user", data:user}, status: :ok
        else
          render json: {status:"ERROR", message: "User was not updated", data:user}, status: :unprocessable_entity
        end

      end


      private
      def user_params_post
        params.permit(:level_id,:position_id,:email,:confirmation_token, :name, :surname, :password,  :description)
      end

      def user_params_put
        params.permit(:level_id,:position_id,:email, :name, :surname,  :description)
      end

    end
  end
end