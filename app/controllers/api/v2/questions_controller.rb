module Api
  module V2
    class QuestionsController < V1::QuestionsController

      before_action :authenticate_user!

    end
  end
end