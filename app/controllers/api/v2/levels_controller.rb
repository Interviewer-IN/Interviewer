module Api
  module V2
    class LevelsController < V1::LevelsController
      before_action :authenticate_user!
    end
  end
end