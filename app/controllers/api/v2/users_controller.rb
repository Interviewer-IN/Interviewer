module Api
  module V2
    class UsersController < V1::UsersController
      before_action :authenticate_user!
      #Todo, is-hr should be verified here
    end
  end
end