module Api
module V1
  class CandidatesController < ApplicationController

    # before_action :authenticate_user!

    def index
      candidates= Candidate.order('created_at DESC')
      render json: {status:"SUCCESS", message: "Candidates loaded", data:candidates}, status: :ok
    end

    def show
      candidate =Candidate.find(params[:id])
      render json: {status:"SUCCESS", message: "Candidate id=#{params[:id]} loaded", data:candidate}, status: :ok
    end

    def create
      candidate = Candidate.new(candidate_params)
      if candidate.save
        render json: {status:"SUCCESS", message: "Saved candidate", data:candidate}, status: :ok
      else
        render json: {status:"ERROR", message: "Candidate not saved", data:candidate.errors}, status: :unprocessable_entity
      end
    end

    def destroy
      candidate =Candidate.find(params[:id])
      if  candidate.destroy
        render json: {status:"SUCCESS", message: "Candidate deleted", data:candidate}, status: :ok
      else
        render json: {status:"ERROR", message: "Candidate was not deleted", data:candidate.errors}, status: :not_found
      end
    end

    def update
      candidate =Candidate.find(params[:id])
      if  candidate.update_attributes(candidate_params)
        render json: {status:"SUCCESS", message: "Update candidate", data:candidate}, status: :ok
      else
        render json: {status:"ERROR", message: "Candidate was not updated", data:candidate.errors}, status: :unprocessable_entity
      end

    end


    private
    def candidate_params
      params.permit( :age, :experience, :contacts, :cv, :level_id, :position_id, :name, :surname, :notes)
    end
  end
end
end