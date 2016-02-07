class RealController < ApplicationController
  def index
  	# @user_profile = LoginRadius::UserProfile.new({
   #    :token => params[:token],
   #    :secret => "a748acf3-7170-4a83-b7ac-58478f715737",
   #    :async => false #Set to true if using EventMachine driven frameworks(must use Em Synchrony)
   #  })
   #  @user_profile.access_token
   
    @token = params[:token]
     if params[:token].nil? 
     	redirect_to "/login"
  
	else
		  	@user_profile = LoginRadius::UserProfile.new({
	      :token => params[:token],
	      :secret => "a748acf3-7170-4a83-b7ac-58478f715737",
	      :async => false #Set to true if using EventMachine driven frameworks(must use Em Synchrony)
	    })
	    @user_profile.access_token
	    gb = Gibbon::Request.new(api_key: "193fe65507e3227e6dfad73feceec3ad-us12")
	   #@mail = gb.lists.members({:id => "f54c991e02"})
	   @mail = gb.lists("f54c991e02").members.retrieve(params: {"fields": "members.email_address"})
	    list_id = "f54c991e02"
	    
	    
	end

	def login

	end

	def destroy
    reset_session
    redirect_to "/login", notice: 'Logged out'
  end

  def subscribe

    @list_id = "YOUR-LIST-ID"
    gb = Gibbon::Request.new(api_key: "193fe65507e3227e6dfad73feceec3ad-us12")

   gb.lists.subscribe({
      :id => @list_id,
      :email => {:email => params[:email][:address]}
      })
 redirect_to "/"
end
 end
end
