module Api
module V2
  class CandidatesController <  V1::CandidatesController

    before_action :authenticate_user!

  end
end
end