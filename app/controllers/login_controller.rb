class LoginController < ApplicationController
  protect_from_forgery except: :callback
  def index
  end
  def callback
    @user_profile = LoginRadius::UserProfile.new({
      :token => params[:token],
      :secret => "a748acf3-7170-4a83-b7ac-58478f715737",
      :async => false #Set to true if using EventMachine driven frameworks(must use Em Synchrony)
    })
    @user_profile.access_token
    @token = params[:token]
  end
