# Advanced Node Project
A sample blog project built with advanced node features such as Caching with Redis, Headless Browser Testing and a Continuos Integration Pioeline

# Project Breakdown
![Project Structure](images/diagrams-01-goals.drawio.png)



# Authentication
## The Google OAuth Flow
1. User visits `/auth/google`
2. User is Forwarded to Google from server
3. User enters login, and is redirected back to `/auth/google/callback` on the server
4. Server asks for more details about user from Google
5. Google responds with User profile
6. Server sets cookie on users browser that identifies them
7. All future requests include cookie data that identifies this user

## Operations after someone signs In From Browser
A cookie is automatically sent to Server along with two properties: 
   - session.sig -> Used to ensure session sent to the user wasn't tampered with
   - session -> Server accesses info in session (*User ID*).
   - Server uses the User ID to lookup the user in Database
   - If user exists --> The incoming request belongs to that user
   - If user doesn't exist, assume the user isn't signed in

## Session Flowchart
1. Request goes into middleware (cookie-session)
2. Coookie-session pulls properties 'session' and 'session.sig' off cookie
3. It uses 'session.sig' to ensure 'session' wasn't manipulated.
4. it Decodes 'session' into a JS object
5. Places that Object on 'req.session' which is then passed onto the Passport middleware
   
6. Passport looks at req.session and tries to find 'req.session.passport.user'
7. If an ID is stored there, pass it to 'deserializeUser'
8. Get back a user and assign it to user then pass on the function to the request handler


# Testing
Testing is done using the popular Jest Testing Library

## Testing flow
1. Start React and Express Apps
2. Run 'npm run test'
3. Start Jest Suite
4. Boot up a 'headless' version of chromium
5. Programatically instruct Chromium to visit 'localhost:3000'
6. Programatically instruct Chromium to Click elements on the Screen
7. Make assertion about content on screen

### Challenges
- Launching Chromium programatically and interacting with it from a test suite
- How to make assertions in Jest about stuff that's happening in a Chrome Window
- How to simulate 'logging' in as a user -> Through Google OAuth

Puppeteer -> Starts Up Chromimum
Browser -> Represents an open Browser Window
Page -> Represents one individual Tab

- Launch Chromium
- Navigate to App
- Click on Stuff on Screen
- Use a DOM Selector to retrieve the content of an element
- write assertion to make sure the content is Correct
- REPEAT


### How to Trick cookie-Session For Authentication Testing
1. Create a Page instance
2. Take an existing user ID and generate a fake session object with it
3. Sign the session object with keygrip
4. Set the Session and signature on our Page instance as cookies

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

