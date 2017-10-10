module Api
  module V1
    class RatingsController < ApplicationController

      # before_action :authenticate_user!

      def index
        ratings = Rating.order('created_at DESC')
        render json: {status:"SUCCESS", message: "Ratings loaded", data:ratings}, status: :ok
      end

      def show
        rating = Rating.find(params[:id])
        render json: {status:"SUCCESS", message: "Rating id=#{params[:id]} loaded", data:rating}, status: :ok
      end

      def create
        rating = Rating.new(rating_params)
        if rating.save
          render json: {status:"SUCCESS", message: "Saved rating", data:rating}, status: :ok
        else
          render json: {status:"ERROR", message: "Rating not saved", data:rating.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        rating = Rating.find(params[:id])
        if  rating.destroy
          render json: {status:"SUCCESS", message: "Rating deleted", data:rating}, status: :ok
        else
          render json: {status:"ERROR", message: "Rating was not deleted", data:rating.errors}, status: :not_found
        end
      end

      def update
        rating = Rating.find(params[:id])
        if  rating.update_attributes(rating_params)
          render json: {status:"SUCCESS", message: "Update rating", data:rating}, status: :ok
        else
          render json: {status:"ERROR", message: "Rating was not updated", data: rating.errors}, status: :unprocessable_entity
        end

      end


      private
      def rating_params
        params.permit(:grade)
      end
    end
  end
end