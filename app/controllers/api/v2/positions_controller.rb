module Api
  module V2
    class PositionsController < V1::PositionsController

      before_action :authenticate_user!

    end
  end
end