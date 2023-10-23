# Web Frontend

This is a simple Typescipt Single Page Web App to demonstrate how to do REST in the cloud.
The test subfolder contains a selenium test, the www folder the web application.

## Shadow Dom

The components use Shadow Dom. To demonstrate this we use two different css-frameworks without side effects.


## Install into a subfolder of a domain:

if you set the environment variable BASE_HREF to a non empty value then the application uses that as the <base href="..."/> attribute, see [base: The Document Base URL element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) for details.

example
```bash
export BASE_HREF=/my.user
./build-and-deploy.sh
```