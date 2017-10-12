module Api
  module V2
    class InterviewsController < V1::InterviewsController
      before_action :authenticate_user!
    end
  end
end