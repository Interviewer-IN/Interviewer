module Api
  module V1
   class ProjectsController < ApplicationController

     # before_action :authenticate_user!

     def index
       projects = Project.order('created_at DESC')
       render json: {status:"SUCCESS", message: "Projects loaded", data:projects}, status: :ok
     end

     def show
       project =Project.find(params[:id])
       render json: {status:"SUCCESS", message: "Project id=#{params[:id]} loaded", data:project}, status: :ok
     end

     def create
       project = Project.new(project_params)
       if project.save
         render json: {status:"SUCCESS", message: "Saved project", data:project}, status: :ok
       else
         render json: {status:"ERROR", message: "Project not saved", data:project.errors}, status: :unprocessable_entity
       end
     end

     def destroy
       project =Project.find(params[:id])
       if  project.destroy
         render json: {status:"SUCCESS", message: "Project deleted", data:project}, status: :ok
       else
         render json: {status:"ERROR", message: "Project was not deleted", data:project.errors}, status: :not_found
       end
     end

     def update
       project =Project.find(params[:id])
       if  project.update_attributes(project_params)
         render json: {status:"SUCCESS", message: "Update project", data:project}, status: :ok
       else
         render json: {status:"ERROR", message: "Project was not updated", data:project.errors}, status: :unprocessable_entity
         end

       end


     private
     def project_params
       params.permit(:title, :description)
     end
   end
  end
end