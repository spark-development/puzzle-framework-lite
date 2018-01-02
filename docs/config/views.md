# config.views

View engine configuration file. The view engine uses handlebars and the extension of
the view files must be **`.hbs`**

## views.views

Folder where all views are stored.

**Type**: string

**Default value**: views

**Other accepted values**: any valid absolute or relative path that contains views

## views.layouts

Folder where all layouts are stored.

**Type**: string

**Default value**: views/layouts

**Other accepted values**: any valid absolute or relative path that contains layouts

## views.partials

Folder where all partials are stored.

**Type**: string

**Default value**: views/partials

**Other accepted values**: any valid absolute or relative path that contains partials

## views.public

Folder where public static content is stored.

**Type**: string

**Default value**: public

**Other accepted values**: any valid absolute or relative path that contains public assets

## views.defaultLayout

Location of the default layout.

**Type**: string

**Default value**: views/layouts/main.hbs

**Other accepted values**: any valid absolute or relative path that points to a layout file.
