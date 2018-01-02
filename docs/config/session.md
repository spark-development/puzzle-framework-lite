# config.session

Session configuration.

## session.secret

The secret used to encrypt the session cookie.

**Type**: string

**Default value**: qwertyuiop

**Other accepted values**: any valid string that will be used to encrypt the session cookie

## session.store

Where the session should be stored.

**Type**: string | function

**Default value**: memory

**Other accepted values**: a function that can be used as store for the current session
