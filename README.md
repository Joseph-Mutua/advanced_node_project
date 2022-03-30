# Advanced Node Project
A sample blog project built with advanced node features such as Caching with Redis, Headless Browser Testing and a Continuos Integration Pioeline

# Testing
Testing is done using the popular Jest Testing Library

## Testing flow
1. Start React and Express Apps
2. Run 'npm run test'
3. start Jest Suite
4. Boot up a 'headless' version of chromium
5. Programatically instruct Chromium to visit 'localhost:3000'
6. Programatically instruct Chromium to Click elements on the Screen
7. Make assertion about content on screen


```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```


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

