# config.http

HTTP Server configuration.

## http.port

Specifies the port the application is listening to.

**Type**: int

**Default value**: 3000

**Other accepted values**: 
  
  * greater than 1024, if the user runs in non-sudo mode;
  * lower or equal than 1024, if the user runs in sudo mode.

## http.listen

The address on which the server listens on.

**Type**: string

**Default value**: 127.0.0.1

**Other accepted values**: any valid IP that machine has, or localhost/127.0.0.1

## http.contextPath

The context path to build URLs in the application.

**Type**: string

**Default value**: *empty string*

**Other accepted values**: any string that can be used as the entry point to the application

## http.cors

Cross-Origin resource sharing variable. A list with the sites that are allowed to access REST resources exposed by the application.

**Type**: string

**Default value**: * (all possible hosts)

**Other accepted values**: any string that can be used as a host or an IP

## http.APIPath

The base path of the API routes.

**Type**: string

**Default value**: /api/master

**Other accepted values**: any path that can be used as a URL
