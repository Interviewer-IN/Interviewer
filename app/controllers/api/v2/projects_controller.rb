module Api
  module V2
   class ProjectsController < V1::ProjectsController

      before_action :authenticate_user!

   end
  end
end