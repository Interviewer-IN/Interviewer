class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  def after_sign_in_path_for(admin)
    rails_admin_path
  end

  layout :set_layout

  private

  def set_layout
    devise_controller? ? 'admin' : false
  end

end
