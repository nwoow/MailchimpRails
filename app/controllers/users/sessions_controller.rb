# app/controllers/users/sessions_controller.rb

class Users::SessionsController < DeviseController
  
  before_filter :authenticate_user!, except: [:create]
  respond_to :json

  def create
    resource = User.find_for_database_authentication(email: params[:user][:email]) 
    return failure unless resource
    return failure unless resource.valid_password?(params[:user][:password])
    render status: 200,
      json: {
        success: true, info: "Logged in", data: {
          user: resource,
          auth_token: resource.authentication_token
        }
      }
  end

  def failure 
    warden.custom_failure! 
    render status: 200,
    json: {
      success: false, info: "Login failed", data: {}
    }
  end 

  def destroy
  resource = User.find_for_database_authentication(id: params[:user][:id]) 
  return failure unless resource
  resource.clear_authentication_token
  render status: 200,
    json: {
      success: true, info: "Logged out"
    }
end
end