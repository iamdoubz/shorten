# Shorten
Shorten is an add-on app for Nextcloud that enables one-click URL shortening. Its features include:
- Automatic replacement of the public share URL with the shortened URL
- No need to create a separate "Shorten" URL
- Internal shortener or goo.gl support
- Ability to completely hide the Nextcloud server with the internal shortener by proxying shortened requests through another server
    - Note: While normal shares will never expose the Nextcloud URL, password protected files will as the password display screen must be supplied to the user.

## Installation

### Step 1: Install the add-on

- Place this app in *nextcloud/apps/shorten* (Rename the extracted ZIP to "shorten" or you will receive errors)
- Re-login to nextcloud and run the update

### Step 2: Setup the shortening server

#### *Step 2 - Option A: goo.gl - Not available anymore*
To use http://goo.gl, all you need to do is acquire  an API key to use in the admin settings. You can acquire  a key using these instructions from Google: *https://developers.google.com/url-shortener/v1/getting_started#APIKey*
NOTE: Google is discontinuing the goo.gl service. Read more here: *https://developers.googleblog.com/2018/03/transitioning-google-url-shortener.html*
  
#### *Step 2 - Option B: Internal shortener and privacy filter*

Next, you must setup your shortening server. This can be the same webserver you are running Nextcloud on, or a completely different server to enable a privacy filter for your nextcloud installation. For the purpose of this guide, we will assume your setup is:
- Your nextcloud server is at *https://mylongdomain.ext:port/nextcloud*
- Your other, "shortening" server, is at *https://mydomain.ext*
- You want your short URLs to be *https://mydomain.ext/s?SHORTCODE*

To accomplish this, you should copy the *REMOTE-HOST/index.php* to the remote host, however you wish. In this example we use scp:
```
mylongdomain ~# scp /var/www/nextcloud/apps/shorten/REMOTE-HOST/index.php root@mydomain.ext:/var/www/s/index.php
```

Next, on the shortening server, edit the file to include your Nextcloud server URL and set enabled to true:
```
mydomain ~# vi /var/www/s/index.php
```
```
<?php

#
# Enter your nextcloud URL below with no trailing slash
# Ex. "https://mydomain.ext/nextcloud"
#
$nextcloud_url = "https://mylongdomain.ext:port/nextcloud";

#
# Set enabled to true when you are ready to use the application
#
$enabled = true;
#$enabled = false;
```

### Step 3: Configure the app

Lastly, visit the administration page for Nextcloud and in the *Shorten* configuration include your shortening server's URL, which is everything before *?SHORTCODE* if you are using the internal shortener. In this case:
```
https://mydomain.ext/s
```
If you're using http://goo.gl, you would need to include your API key in the provided settings box.

At this point, when you check the box to share a file publically, the app will replace the public share link displayed in the Nextcloud web interface.
