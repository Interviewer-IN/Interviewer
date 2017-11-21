module Api
  module V1
    class QuestionsController < ApplicationController

      # before_action :authenticate_user!

      def index
        questions = Question.order('created_at DESC')
        render json: {status:"SUCCESS", message: "Questions loaded", data: questions}, status: :ok
      end

      def show
       question = Question.find(params[:id])
        render json: {status:"SUCCESS", message: "Question id=#{params[:id]} loaded", data:question}, status: :ok
      end

    end
  end
end