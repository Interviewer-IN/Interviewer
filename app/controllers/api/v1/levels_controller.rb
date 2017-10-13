module Api
  module V1
    class LevelsController < ApplicationController

      # before_action :authenticate_user!

      def index
        levels = Level.order('created_at DESC')
        render json: {status:"SUCCESS", message: "Projects loaded", data:levels}, status: :ok
      end

      def show
        level =Level.find(params[:id])
        render json: {status:"SUCCESS", message: "Level id=#{params[:id]} loaded", data:level}, status: :ok
      end

      def create
        level = Level.new(level_params)
        if level.save
          render json: {status:"SUCCESS", message: "Saved level", data:level}, status: :ok
        else
          render json: {status:"ERROR", message: "Level not saved", data:level.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        level =Level.find(params[:id])
        if  level.destroy
          render json: {status:"SUCCESS", message: "Level deleted", data:level}, status: :ok
        else
          render json: {status:"ERROR", message: "Level was not deleted", data:level.errors}, status: :not_found
        end
      end

      def update
        level =Level.find(params[:id])
        if  level.update_attributes(level_params)
          render json: {status:"SUCCESS", message: "Update level", data:level}, status: :ok
        else
          render json: {status:"ERROR", message: "Level was not updated", data:level.errors}, status: :unprocessable_entity
        end

      end


      private
      def level_params
        params.permit(:name)
      end
    end
  end
end