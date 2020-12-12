# team08 Itinerary Application

# How to run:
        
## Phase 2 Instructions
1. Go to [our deployed website](https://calm-citadel-31828.herokuapp.com)
1. Sign in details are as follows (Make sure to press the submit button when signing on):
    1. Regular user: 
        1. Username: user
        1. Password: user
    1. Admin user:
        1. Username: admin
        1. Password: admin
        
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

After clicking "Create a new itinerary", the user can name their trip, choose a starting point, choose an end point, add stops along the way and add the start date. Once they are done, they can click the check mark to view the map. 

## VIEWING ITINERARY MAP

On the map, there are two buttons. One to view the itinerary comments and one to view the itinerary itself. The itinerary will pop up on the right and the user can click the addresses to view the reviews. An edit itinerary button is on the top left of the itinerary panel. From here, one can edit the itinerary.

# ADMIN USER

From the admin view, they can delete and view users. They can also delete itineraries. These features will be used by an admin to remove inappropriate users/itineraries.

# SEARCH VIEW

By default, the search view is configured to search through users. Just type in a user (such as User) and press enter to retrieve the user.

# PLACE SEARCH

Place search will occur in the create an itinerary page where addresses are autofilled thanks to google maps API

# USER SEARCH

After a user has been searched (For this demo, search for "Kate"), one can view their profile or add them as a friend. *Note: As mentioned earlier, adding a friend on the front end is not implemented*

# USER SETTINGS

Here, the user can change their profile picture, name, email, location and password.

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

  
* GET "/users/logout" - A route that returns nothing, just logs users out.
        
* GET "/users/check-session" - A route that checks the session. It returns a JSON that looks like this:

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

### Additional libraries/frameworks used: 
- material ui
- simple-react-comments
