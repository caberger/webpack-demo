# kubernetes deployment

## nginx
nginx is configured to forward /api requests to quarkus. 
index.html and other files must be copied to the persistent volume nginx-www, then they are available in the browser.
