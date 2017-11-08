module Api
  module V2
    class RatingsController < V1::RatingsController

       before_action :authenticate_user!
    end
  end
end