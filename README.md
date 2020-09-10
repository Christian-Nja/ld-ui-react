# URI encoded icon

You can download svg icons, uri encode and embed them directly in the html file.
This is a good solution avoiding to struggle with webpack building configuration for
applications using this package.

Some day you may host icons in a separate online server and switch the iconUrl to the online one.

To encode icons you need to:

-   download svg: https://freesvg.org/

$ npm run encode-svg
