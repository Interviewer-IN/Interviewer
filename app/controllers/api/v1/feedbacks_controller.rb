module Api
  module V1
    class FeedbacksController < ApplicationController

      def index
        feedbacks = Feedback.where(interview_id: params[:interview_id])
        render json: {status:"SUCCESS", message: "Feedbacks loaded", data: feedbacks}, status: :ok
      end

      def show
        feedback =Feedback.find(params[:id])
        render json: {status:"SUCCESS", message: "Feedback id=#{params[:id]} loaded", data:feedback}, status: :ok
      end

      def create
        feedback = Feedback.new(feedback_params)
        if feedback.save
          render json: {status:"SUCCESS", message: "Saved feedback", data:feedback}, status: :ok
        else
          render json: {status:"ERROR", message: "Feedback not saved", data:feedback.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        feedback = Feedback.find(params[:id])
        if  feedback.destroy
          render json: {status:"SUCCESS", message: "Feedback deleted", data:feedback}, status: :ok
        else
          render json: {status:"ERROR", message: "Feedback was not deleted", data:feedback.errors}, status: :not_found
        end
      end

      def update
        feedback = Feedback.find(params[:id])
        if  feedback.update_attributes(feedback_params)
          render json: {status:"SUCCESS", message: "Update feedback", data:feedback}, status: :ok
        else
          render json: {status:"ERROR", message: "feedback was not updated", data:feedback.errors}, status: :unprocessable_entity
        end

      end


      private
      def feedback_params
        params.permit(:answer, :interview_id, :question_id)
      end
    end
  end
end