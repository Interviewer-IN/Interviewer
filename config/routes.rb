Rails.application.routes.draw do

  post "/graphql", to: "graphql#execute"

  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  resources :candidates
  mount_devise_token_auth_for 'User', at: 'auth'
  devise_scope :admin do
    get '/admin/sign_out' => 'devise/sessions#destroy'
  end

# root 'rails_admin/main#dashboard'

  devise_for :admin
 # devise_for :admin, path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup' }
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'v1' do
      resources :projects, :vacancies, :positions, :levels,
                :candidates, :ratings, :interviews, :users, :questions
    end
    namespace 'v2' do
      resources :projects, :vacancies, :positions, :levels,
                :candidates, :ratings, :interviews, :users, :questions
    end


  end
end
