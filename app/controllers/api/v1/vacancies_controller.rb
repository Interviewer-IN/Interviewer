module Api
  module V1
    class VacanciesController < ApplicationController

      # before_action :authenticate_user!

      def index
        vacancies = Vacancy.order('created_at DESC')
        render json: {status:"SUCCESS", message: "Projects loaded", data:vacancies}, status: :ok
      end

      def show
        vacancy =Vacancy.find(params[:id])
        render json: {status:"SUCCESS", message: "Vacancy id=#{params[:id]} loaded", data:vacancy}, status: :ok
      end

      def create
        vacancy = Vacancy.new(project_params)
        if vacancy.save
          render json: {status:"SUCCESS", message: "Saved vacancy", data:vacancy}, status: :ok
        else
          render json: {status:"ERROR", message: "Vacancy not saved", data:vacancy.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        vacancy =Vacancy.find(params[:id])
        if  vacancy.destroy
          render json: {status:"SUCCESS", message: "Vacancy deleted", data:vacancy}, status: :ok
        else
          render json: {status:"ERROR", message: "Vacancy was not deleted", data:vacancy.errors}, status: :not_found
        end
      end

      def update
        vacancy =Vacancy.find(params[:id])
        if  vacancy.update_attributes(project_params)
          render json: {status:"SUCCESS", message: "Update vacancy", data:vacancy}, status: :ok
        else
          render json: {status:"ERROR", message: "Vacancy was not updated", data:vacancy.errors}, status: :unprocessable_entity
        end

      end


      private
      def vacancy_params
        params.permit(:status, :description, :level_id, :project_id, :position_id)
      end
    end
  end
end