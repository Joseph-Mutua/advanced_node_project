# Advanced Node Project
A sample blog project built with advanced node features such as Caching with Redis, Headless Browser Testing and a Continuos Integration Pioeline

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

### Puppeteer -> Starts Up Chromimum
### Browser -> Represents an open Browser Window
### Page -> Represents one individual Tab

- Launch Chromium
- Navigate to App
- Click on Stuff on Screen
- Use a DOM Selector to retrieve the content of an element
- write assertion to make sure the content is Correct
- REPEAT


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

