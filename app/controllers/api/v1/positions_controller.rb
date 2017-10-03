module Api
  module V1
    class PositionsController < ApplicationController

      # before_action :authenticate_user!

      def index
        positions = Position.order('created_at DESC')
        render json: {status:"SUCCESS", message: "Projects loaded", data:positions}, status: :ok
      end

      def show
        position =Position.find(params[:id])
        render json: {status:"SUCCESS", message: "Position id=#{params[:id]} loaded", data:position}, status: :ok
      end

      def create
        position = Position.new(project_params)
        if position.save
          render json: {status:"SUCCESS", message: "Saved position", data:position}, status: :ok
        else
          render json: {status:"ERROR", message: "Position not saved", data:position.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        position =Position.find(params[:id])
        if  position.destroy
          render json: {status:"SUCCESS", message: "Position deleted", data:position}, status: :ok
        else
          render json: {status:"ERROR", message: "Position was not deleted", data:position.errors}, status: :not_found
        end
      end

      def update
        position =Position.find(params[:id])
        if  position.update_attributes(project_params)
          render json: {status:"SUCCESS", message: "Update position", data:position}, status: :ok
        else
          render json: {status:"ERROR", message: "Position was not updated", data:position.errors}, status: :unprocessable_entity
        end

      end


      private
      def vacancy_params
        params.permit(:name)
      end
    end
  end
end