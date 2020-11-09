# team08 Itinerary Application

# How to run:

1. navigate to `./../itinerary_app' in your console
1. `npm install`
1. `npm start`
1. You should see that the website loads on http://localhost:3000 (Use Google Chrome for the best experience)
1. Top right, there are three buttons. One to pop up an about card, one to sign in and one to sign up.
1. Sign in details are as follows (Make sure to press the submit button when signing on):
    1. Regular user: 
        1. Username: user
        1. Password: user
    1. Admin user:
        1. Username: admin
        1. Password: admin
        
# ACCOUNT CREATION

Here, the new user can create an account by filling in the appropriate fields. Their profile picture can be set later in the settings menu.

*Note: Currently, after creating the account, it leads you to the hardcoded user page. In the full release it should fill in the appropriate details.*
        
# USER VIEWS

If you are signed in as a user. You can create a new itinerary, view/remove an already made itinerary, move an existing itinerary to your favourites list, and remove friends.

If you are signed in as an admin. You can view users and all itineraries on the website.

In both "signed-in" views, there is a bar at the top. In this bar are multiple buttons. One button signs you out and brings you to the home page, one leads you to the user settings page, one leads you to search functions, and one leads you to the user page. If you are already at the user page, you will not have the button to bring you to the user page. 

# STANDARD USER

From the standard user view, you can go to "itineraries" and click the card to view the additional destinations. Click the "view" button to be brought to the itinerary view. Click "Delete this itinerary" to remove it from your itineraries list. Click "Favourite this itinerary" to add the itinerary to the user's favourites list.

Favourites tab is where the favourited itineraries are. The user can remove them if they wish.

Friends tab is where the user's friends are. The user can remove them if they wish.

## CREATING AN ITINERARY

After clicking "Create a new itinerary", the user can name their trip, choose a starting point, choose an end point, add stops along the way and add the start date. Once they are done, they can click the check mark to view the map. On the map, there are two buttons. One to view the itinerary comments and one to view the itinerary itself. The itinerary will pop up on the right and the user can click the addresses to view the reviews.

*Note: the map is a still image currently as this is just a proof of concept*

## VIEWING AN ITINERARY

This skips the itinerary creation step from before and the user will be brought to the map immediately. All functionality is the same as before.

# ADMIN USER

From the admin view, they can delete and view users. They can also delete itineraries. These features will be used by an admin to remove inappropriate users/itineraries.

# SEARCH VIEW

By default, the search view is configured to search through users. Just type in a user (such as Kate) and press enter to retrieve the user. To search through places, click the 'Places' button and then type in your query followed by the enter key.

# PLACE SEARCH

After a user has searched for a location, they can either view details of the location or they can add to their itinerary.

# USER SEARCH

After a user has been searched, they can view their profile, add them as a friend or block them.

# USER SETTINGS

Here, the user can change their profile picture, name, email, location and password.

### Additional libraries used: material ui
