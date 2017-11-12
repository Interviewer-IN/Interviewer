module Api
  module V2
    class FeedbacksController < V1::InterviewsController
      before_action :authenticate_user!
    end
  end
end