# config.engine

Settings that tune some parts of the engine core.

## engine.debug

Is the application in debug mode? If set to true then the log level is overwritten to be debug.

**Type**: boolean

**Default value**: false

**Other accepted values**: true

## engine.name

Name of the application to be displayed in the log and various other places.

**Type**: string

**Default value**: Puzzle Framework Sample

**Other accepted values**: any given string

## engine.log

Log configuration.

### engine.log.level

Specifies the level of detail needed in the logs.

**Type**: string

**Default value**: info

**Other accepted values**: 

  * debug
  * info
  * notice
  * warning
  * critical
  * alert
  * emergency


## engine.log.file

Specifies the location of the log file. If empty string is given, then the logs will be shown in the console.

**Type**: string

**Default value**: ./logs/puzzle.log

**Other accepted values**: 

  * empty string
  * any valid path
  
## engine.log.rotate

Should the log be rotated? If this is set to false then `engine.log.compress` and `engine.log.count` won't be taken
into consideration.

**Type**: boolean

**Default value**: true

**Other accepted values**: false

## engine.log.file

Maximum log file size before rotation. Modifiers are: k(ilo), m(ega), g(iga)

**Type**: string

**Default value**: 50k

**Other accepted values**: any value that uses the correct modifier k(ilo), m(ega) or g(iga)
  
## engine.log.compress

Should the log be compressed?

**Type**: boolean

**Default value**: false

**Other accepted values**: true

## engine.log.count

How many rotation files should exist.

**Type**: int

**Default value**: 3

**Other accepted values**: any other integer value greater than 0


