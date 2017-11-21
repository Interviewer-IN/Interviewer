module Api
  module V1
    class InterviewsController < ApplicationController

      # before_action :authenticate_user!

      def index
        if params.key?(:user_id)
        interviews = Interview.where(user_id: params[:user_id])
        render json: {status:"SUCCESS", message: "Interviews loaded", data:interviews}, status: :ok
        else
          interviews = Interview.order('created_at DESC')
          render json: {status:"SUCCESS", message: "Interviews loaded", data:interviews}, status: :ok
        end
      end

      def show
        interview = Interview.where(id: params[:id], user_id: params[:user_id])
        if !interview.blank?
        render json: {status:"SUCCESS", message: "Interview id=#{params[:id]} loaded", data:interview}, status: :ok
        else
        render json: {status:"ERROR", message: "Nothing found"}, status: :ok
        end
      end

      def create
        interview = Interview.new(interview_params)
        if interview.save
          render json: {status:"SUCCESS", message: "Saved interview", data:interview}, status: :ok
        else
          render json: {status:"ERROR", message: "Interview not saved", data:interview.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        interview = Interview.find(params[:id])
        if  interview.destroy
          render json: {status:"SUCCESS", message: "Interview deleted", data:interview}, status: :ok
        else
          render json: {status:"ERROR", message: "Interview was not deleted", data:interview.errors}, status: :not_found
        end
      end

      def update
        interview = Interview.find(params[:id])
        if  interview.update_attributes(interview_params)
          render json: {status:"SUCCESS", message: "Update interview", data:interview}, status: :ok
        else
          render json: {status:"ERROR", message: "Interview was not updated", data:interview.errors}, status: :unprocessable_entity
        end

      end

      private
      def interview_params
        params.permit(:status, :state, :date_time,
                      :candidate_id, :vacancy_id, :user_id, :rating_id)
      end
    end
  end
end