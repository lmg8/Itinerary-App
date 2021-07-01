# Itinerary Application

# Example of optimized Itinerary Map usage:
  
This video shows the web app finding the optimal route between five locations.

User input: Union Station (Starting Location), CN Tower, Distillery District, Royal Ontario Museum, Ripley's Aquarium (Destination)
Map Output: Union Station, Distillery District, Royal Ontario Museum, CN Tower, Ripley's Aquarium

https://user-images.githubusercontent.com/37385317/124187600-1060fb80-da8c-11eb-8942-26bd91b47c81.mp4



# ACCOUNT CREATION

Here, the new user can create an account by filling in the appropriate fields. After creating a user, you will need to sign in again with your newly created account.
        
# USER VIEWS

If you are signed in as a user. You can create a new itinerary, view/remove an already made itinerary, move an existing itinerary to your favourites list, and remove friends. 

If you are signed in as an admin. You can view users and all itineraries on the website.

In both "signed-in" views, there is a bar at the top. In this bar are multiple buttons. One button signs you out and brings you to the home page, one leads you to user settings, one leads you to search functions, and one leads you to the user page. If you are already at the user page, you will not have the button to bring you to the user page. The admin user will have an admin menu button instead of a user settings button.


# STANDARD USER

From the standard user view, you can go to "itineraries" and click the card to view the additional destinations. Click the "view" button to be brought to the itinerary view. Click "Delete this itinerary" to remove it from your itineraries list. Click "Favourite this itinerary" to add the itinerary to the user's favourites list.

Favourites tab is where the favourited itineraries are. The user can remove them if they wish. *Note: It is not implemented on the front end as we ran out of time, but the routing works*

Friends tab is where the user's friends are. The user can remove them if they wish. *Note: Adding friends though the search bar is not implemented due to time constraints, but the routing is there*

## CREATING AN ITINERARY

After clicking "Create a new itinerary", the user can name their trip, choose a starting point, choose an end point, add multiple stops along the way and add the start date. Once they are done, they can click the check mark to view the map. Currently, adding start date only works for Chrome due to Materials-UI implementation. The implementation uses Google Maps Autocomplete. We limited the places to Canada only due to API key restrictions.

## VIEWING ITINERARY MAP

On the map, there are two buttons. One to view the itinerary comments and one to view the itinerary itself. The itinerary will pop up on the right and the user can click the addresses to view the reviews. 
Note: Getting reviews from Google API has not been implemented due to API limits. However, we hardcoded fake reviews to show proof of concept.


# ADMIN USER

From the admin view, an admin user can view all users and itineraries. These show up as cards with buttons to view and delete. On clicking view, the user will be brought to their user page. On clicking delete, the user or itinerary will be deleted from the database. These features will be used by an admin to remove inappropriate users/itineraries.

# SEARCH VIEW

By default, the search view is configured to search through users. Type in the search bar and click enter to find users in the system. The users will be displayed on cards with two options: View Profile and Add Friend. Clicking the view profile button will bring the user to their user page.

*Note: As mentioned earlier, adding a friend on the front end is not implemented*


# OTHER USER

The other user page takes a given user and retrieves their itineraries, favourites, and friends. These are displayed on cards hidden in tabs that the user can click through.

# USER SETTINGS

Here, the user can change their profile picture, first name, last name, email, and password.

*Note: Changing profile picture works on the front end, but does not save to the backend. There was a bug where password was not hashing when being updated in the database. Front end works, however, changing password will not save to the database.*


# EXPRESS ROUTES
* POST "/users/login" - A route that sends a JSON that looks like this:

        {
            "username": "user"
            "password": "user"
        }
        
and returns a JSON that looks like this:

        {
            "currentUser": "user"
        }

  
* GET "/users/logout" - A route that returns nothing, just logs users out. No data to be sent.
        
* GET "/users/check-session" - A route that checks the session. No data to be sent. It returns a JSON that looks like this:

        {
            "username": "user"
            "password": "user"
        }

* POST "/api/users" - A route that creates a user. It expects a JSON that looks like this:

        {
            "email": "user@email.com"
            "username": "user"
            "password": "user"
            "firstName": "userFirst"
            "lastName": "userLast"
            "adminStatus": false
            "friends": []
        }
It returns the created user

* POST "/api/itineraries" - A route that creates an itinerary. It expects a JSON that looks like this:

        {
            "name": "itineraryName"
            "startDate": 2020-12-13T01:20:00:00.000+00:00
            "source": "Toronto"
            "destination: "Montreal"
            "waypoints": []
            "creator": <A string that represents a user id>
        }
   
It returns...

* GET "/api/itineraries" - A route that gets all itineraries. It returns all itineraries in JSON format. No data to be sent.

* GET “/api/user/:id/itineraries” - A route that returns all itineraries for a specific user.  “:id” is the id of the user. No data to be sent.

* GET “/api/users/:id/friends” - A route that returns all friends of a specific user. “:id” is the id of the user. No data to be sent.

* GET “/api/users/:id/friends/:friendid” - A route that returns a specific friend of a specific user.   “:id” is the id of the user and “friendid” is the id of the friend. No data to be sent.

* GET “/api/users/:id/favourites” - A route that returns an array of favourites of a specific user.  “:id” is the id of the user. No data to be sent.

* GET “/api/user/itineraries” - A route that returns an array of all the itineraries for the current user. No data to be sent.

* GET “/api/itineraries/:id” - A route that returns a specific itinerary. “:id” is the itinerary id. No data to be sent.
 
* GET “/api/users” - A route that returns all users. No data to be sent.

* GET “/api/users/:id” - A route that returns the user with the userid “:id”. No data to be sent.

* PATCH “/api/users/:id” - A route that updates the user. It expects a JSON that looks like this: 

        {
            {“op”:”replace”, “path”:”/friends”, “value”: [<Some userid strings here>]
        }



* PATCH "'/api/itineraries/:id/comments''" - A route that updates itinerary comments. It expects a JSON that looks like this:

        {
            "value": CommentsSchema
        }
        

* PATCH "'/api/itineraries/:id/itineraries'''" - A route that updates itinerary comments. It expects a JSON that looks like this:

        {
            "value": <A representation of the user id>
        }
        
        
* DELETE "'/api/users/:id'" - A route that deletes a user.


* DELETE "'/api/itineraries/:id'" - A route that deletes an itinerary.



### Additional libraries/frameworks used: 
- Material-UI
- simple-react-comments
- Google Cloud Platform
- React-Google-Maps
