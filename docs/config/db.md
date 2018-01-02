# config.db

Database configuration.

## db.migrations

Location of the migration files.

**Type**: string

**Default value**: ./db/migrations

**Other accepted values**: any valid absolute or relative path that contains migration files.

## db.seeds

Location of the seed files.

**Type**: string

**Default value**: ./db/seeds

**Other accepted values**: any valid absolute or relative path that contains seed files.

## db.*&lt;environemnt&gt;*

Database connection configuration for any environment that the application that uses 
the framework. The framework has a the driver for mysql connection pre-installed.

**Type**: object

**Default value**: local

**Predefined values**: local, test, production

**Other possible values**: dev, etc...

## db.*&lt;env&gt;*.driver

The driver used to connect to the specified database.

**Type**: string

**Default value**: mysql

**Other accepted values**: pgsql or any driver supported by sequelizejs

## db.*&lt;env&gt;*.user

The username used to connect to the specified database.

**Type**: string

**Default value**: root

**Other accepted values**: valid database connection user

## db.*&lt;env&gt;*.password

The password used to connect to the specified database.

**Type**: string

**Default value**: *empty string*

**Other accepted values**: valid database connection password

## db.*&lt;env&gt;*.host

The hostname used to connect to the specified database.

**Type**: string

**Default value**: localhost

**Other accepted values**: valid database server hostname

## db.*&lt;env&gt;*.port

The port used to connect to the specified database.

**Type**: integer

**Default value**: 3306

**Other accepted values**: valid port on which the database server is exposed

## db.*&lt;env&gt;*.database

The database name that the application will use.

**Type**: string

**Default value**: puzzle_sample

**Other accepted values**: valid database name in the given host

