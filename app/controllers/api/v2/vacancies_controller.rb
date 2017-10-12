module Api
  module V2
    class VacanciesController < V1::VacanciesController

       before_action :authenticate_user!

    end
  end
end