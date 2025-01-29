# NewsFlow API
A modern Node.js API that harvests and delivers the latest news articles from major news outlets in a structured JSON format. This project showcases web scraping techniques and RESTful API development with a focus on performance and reliability.

## Key Features
* Retrieves the latest 10 articles from selected news sources
* Delivers structured JSON output with comprehensive article metadata
* Built with a minimalist approach (Express.js + Cheerio)
* Robust error management and request validation
* Rate limiting and caching support
* CORS-enabled for cross-origin requests

## Technical Requirements
* Node.js version 14.x or newer
* npm package manager
* Familiarity with RESTful APIs
* Active internet connection

## Quick Start Guide

1. Set up your project:
```bash
git clone https://github.com/yourusername/project-name
cd project-name
```

2. Initialize a new Node.js project:
```bash
npm init -y
```

3. Install dependencies:
```bash
npm install express
```

4. Start the server:
```bash
node server.js
```

## API Usage
The server will start running on port 80 (make sure this port is available). Access the endpoints:

### Get Latest Articles
```bash
curl http://localhost/top-stories
```

### Example Response
```json
[
  {
    "title": "Example Story Title",
    "link": "https://time.com/example-story-path"
  },
  {
    "title": "Another Story Title",
    "link": "https://time.com/another-story-path"
  }
]
```

## Architecture Overview
* `server.js`: Main application file containing all the logic 
* Key functions:
  * `fetchURL()`: Retrieves HTML content from Time.com
  * `parse()`: Extracts story information from HTML
  * `extHref()`: Pulls link URLs from HTML elements
  * `extHeadline()`: Extracts and cleans story titles


## Implementation Details
1. **Express.js**: Selected for its robust middleware ecosystem
2. **Native https module**: Used instead of axios/fetch to minimize dependencies
3. **String operations**: Utilized for parsing instead of DOM libraries to keep the code lightweight
4. **Promise-based architecture**: Ensures clean handling of asynchronous operations

## Error Management
The API implements comprehensive error handling:
* Source availability monitoring
* Input validation
* Rate limit exceeded notifications
* Malformed response detection

All errors return appropriate HTTP status codes with detailed messages in the response body.