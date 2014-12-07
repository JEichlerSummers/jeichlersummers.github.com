---
title: Fun with your friend's Facebook sessions
layout: post
published: false
---
<h3>The Setup</h3>

Your friend, the noble Steve Steveington, has been really getting your goat recently.

You have to hit him where it hurts. In his Tinder account.

It’s now 4pm. Steve Steveington has gone to make a sandwich, and has made the fatal error of forgetting to lock his computer. Your research suggest that he usually favours peanut butter and banana for his late afternoon snack, and that you most likely have 2 minutes alone with his computer, perhaps 3 if he has trouble locating the peanut butter jar that you strategically hid behind the mustard.

<h3>Phase 1 - The Cookie Toss</h3>

You’ve trained for this moment for months, but even 3 minutes is not enough time to execute your entire plan end-to-end. You keep calm. You can use this small window of opportunity to throw his Facebook session from his laptop onto yours, then continue with the next phase right under his oblivious nose.

His session is in his browser cookies. You get his facebook.com cookies, you get his session.

You open up Chrome, reach for a developer console and throw down some Javascript. But `document.cookies` only gives you ~6 of the ~11 cookies set by Facebook. The other 5, the ones with the session data that you actually care about, are all marked httponly and are completely inaccessible by Javascript. The clock is ticking.

You remember that Chrome stores its cookies in a sqlite3 database in `~/Library/Application\ Support/Google/Chrome/Default/`. Perfect.

{% highlight text %}
$ cd ~/Library/Application\ Support/Google/Chrome/Default/
$ sqlite3 Cookies
sqlite> .tables
cookies  meta 
sqlite> SELECT * FROM cookies WHERE host_key = '.facebook.com';
13062147169518406|.facebook.com|lu||/|13125219169518406|1|1|13062379845976145|1|1|1|v10ޣ??ʐ
                                                                                           jx?~ ??1s???\?'yP???o)
13062147169518689|.facebook.com|datr||/|13125219169518689|0|1|13062379845976145|1|1|1|v10?A3գh?;?#??Gէ?{?ϧaN?uZ'?
13062377970310829|.facebook.com|c_user||/|0|1|0|13062379805849180|0|0|1|v10???J?t|n?#?
13062377970310903|.facebook.com|fr||/|13064969970310903|0|1|13062379845976145|1|1|1|v10q????@(??8???c?0®A?e??=???1?$?????)??:?ŧy"??SI??͑
                                                                                                                                       ? ??????g>??n?
13062377970310964|.facebook.com|xs||/|0|1|1|13062379845976145|0|0|1|v10d?Yh??q?oPc??
13062377970311003|.facebook.com|csm||/|0|0|0|13062379805849180|0|0|1|v10??wk??.?????
13062377970311046|.facebook.com|s||/|0|1|1|13062379845976145|0|0|1|v10?)Y?u?z?v??}?j????8?yI??????SO<
13062379756062586|.facebook.com|act||/|0|0|0|13062379816210267|0|0|1|v10?>p[ƀ?&??}?
m???'?5u??fV
13062379784282038|.facebook.com|p||/|0|0|0|13062379844460194|0|0|1|v10u?z⌒ܼ?G?
3062379789561602|.facebook.com|presence||/|0|1|0|13062379849972955|0|0|1|v10^C?dk5??i?K鉞1x?)7V???ky?
l??M???\?55333060|.facebook.com|wd||/|0|0|0|13062379855333060|0|0|1|v10?????
{% endhighlight %}

They’re encrypted. A dead end. The clock is ticking.

You could use the Chrome Developer Tools to inspect an HTTP request to facebook.com and see what cookies it contains, but first you remember a handy little Chrome Extension called <a href="https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en" target="_blank">EditThisCookie</a>. This extension is able to export and import cookies with incredible speed, since Chrome Extensions (unlike Javascript run from a webpage) have access to all cookies, even those marked httponly.

<p style="text-align:center">
<img src="/images/fb/editcookie.png" />
</p>

You quickly install it, hit "Export" and email yourself the JSON serialised cookies:

{% highlight text %}
[
  {
      "domain": ".facebook.com",
      "hostOnly": false,
      "httpOnly": false,
      "name": "act",
      "path": "/",
      "secure": false,
      "session": true,
      "storeId": "0",
      "value": "12345678901234567890",
      "id": 1
  },
  …
]
{% endhighlight %}

You uninstall it again and delete the browser history to avoid arousing suspicion. You fire up your laptop, import these cookies, and hit facebook.com. Steve Steveington’s Facebook account materialises. As long as Steve doesn’t log out and expire your now shared session, phase 1 is complete.

Steve comes back, enormous sandwich in hand. But it’s too late. You’re in.

<h3>Phase 2 - The Proxy</h3>

Now for the tricky part - parlaying a Facebook session on a laptop into a Tinder session on an iPhone app.

You’ve bought yourself some time with your cooking tossing trick. You can only hope to God it’s enough.

<h3>Step 1 - You Got The Proxy</h3>

You download the free version of Burp Suite Proxy. You set it up; this doesn’t take more than a few minutes. You install the Burp Suite SSL certificate on your phone, setup the proxy on your computer and connect your phone to it.

It’s time to <a href="http://en.wikipedia.org/wiki/Man-in-the-middle_attack" target="_blank">Man-In-The-Middle</a> yourself.

<h3>Step 2 - The Man In The Middle</h3>

Palms sweating, you uninstall the Facebook app to make sure your Facebook auth requests open in Safari. You log out of your Tinder account. Germintrude, 26, can wait. This cannot.

<p style="text-align:center">
<img src="/images/fb/image.png" />
<img src="/images/fb/confirmloaded.png" />
</p>

The Tinder login screen appears. You hit "Log In with Facebook", and are redirected to a Facebook auth page in mobile Safari, which is logged into Facebook as you. You put down your phone and jump over to your laptop.

<p style="text-align:center">
<img src="/images/fb/burp.png" />
</p>

You open Burp Suite and find the log for the HTTP GET request for the auth page now showing on your phone. You copy the URL into your laptop browser, which is logged into Facebook via stolen cookie as Steve Steveington. Blissfully unaware that this makes no sense, it shows the Facebook auth screen, asking if Steve Steveington wants to authorise Tinder. You know that he absolutely does not. You pause and look up at your friend's peanut butter-smeared face. You’ve been through so much together. But this is no time for sentimentality. You hit OK.

<p style="text-align:center">
<img src="/images/fb/authlaptop.png" />
</p>

You return to Burp Suite and find the log for the HTTP POST request for this authorisation. You copy the HTTP response into Evernote.

{% highlight text %}
HTTP/1.1 200 OK
Content-Type: application/x-javascript; charset=utf-8
P3P: CP="Facebook does not have a P3P policy. Learn why here: http://fb.me/p3p”
<SNIP>
Date: Sun, 16 Nov 2014 23:13:59 GMT
Connection: keep-alive
Content-Length: 1947

for (;;);{"__ar":1,"payload":null,"jsmods":{"require":[["ServerRedirect","redirectPageTo",[],["fb464891386855067:\/\/authorize\/#state=\u00257B\u002522is_open_session\u002522\u00253Atrue\u00252C\u002522is_active_session\u002522\u00253Atrue\u00252C\u002522com.facebook.sdk_client_state\u002522\u00253Atrue\u00252C\u0025223_method\u002522\u00253A\u002522browser_auth\u002522\u00252C\u0025220_auth_logger_id\u002522\u00253A\u0025225B6667BD-13D0-48CF-9157-5B8FB374F401\u002522\u00257D&granted_scopes=public_profile\u00252Cbasic_info\u00252Cemail\u00252Ccontact_email\u00252Cuser_birthday\u00252Cuser_relationship_details\u00252Cuser_location\u00252Cuser_likes\u00252Cuser_activities\u00252Cuser_interests\u00252Cuser_education_history\u00252Cuser_photos\u00252Cuser_friends\u00252Cuser_about_me\u00252Cuser_status&denied_scopes=&signed_request=5c4FR7ED_xVU2knkQHRHNRZa016BBGC38BgGVkw4AI4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUE0VFhjUldGOEZTMTN0VnhyUmtyN2g2QWc3VHQwNGNBRVRoeXc0M2RnOFVOanp2Nzh5OUpVZUNvR083bTF5VFRwU0MzRDFzNFVRV083aVdDREVIVktjTThzMTBNZnRKLWZVM3puaXY0OEV3QTRPOU9EQk5XakdyZWNFTzktYkphMTJhLXJ3Qzk4QXptQjF1cFM1T3U5bGF5MHFNMXBRZzh0RGtDdnBRQ29nbldzNEZYa3k5UFVzcFBiUndXSDBERElicUZvZ1ZNdjVlY3pmajhNNTRGNnZ2RGNXTEJkX2RDZ0Q3OTRmbjhRbXROcHJWcDB2eUR0SXVJeTlZanBnNTlPVU1FYlFFX3BJTzNTRGpjS2dRa0MtYzk4NERybVdCbko5M3VSc0Zra1dkMDJmNjk5THVuVGlWQVF0aWc4LVJlRmctbDdvVFpBdWhwdmJURVdkTldTdGJGdnZqeUtrT2MwaUU0dnhMejZVMlEiLCJpc3N1ZWRfYXQiOjE0MTYxNzk2MzksInVzZXJfaWQiOiIzNjgxODc1NyJ9&access_token=CAAGm0PX4ZCpsBAP3Q75xs8VgF71BHxIAeN7ieZCFZBv6UT9fAQ5eKf9FOTygLVlZCwZB79z72urotOK8y7GmmeTXyiSKlZCIHLYZBZApli8KaCo39C4aEMcAAOZCPsxxMUkZATFxjPLhJQbqVO5v0x8vxsStas8eIqd6eDOcjjSAI10ORUspEZACOZBU8IlvehtfkbjnimhIkqMEGfXmsBy9Cb2JDKo3KAdheU3K2C3W2rdI1gZDZD&expires_in=6361",true]]]},"js":["BxHP+"],"bootloadable":{},"resource_map":{"BxHP+":{"type":"js","crossOrigin":1,"src":"https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yG\/r\/jpiKiPJrEY9.js"}},"ixData":{}}
{% endhighlight %}

This several kB string of text contains the encrypted auth token that will get you into Steve’s Tinder account. Now you just have to throw it onto your phone. The coup de grace.

You turn on Burp Suite’s “Intercept” mode, which will catch HTTP requests and responses for you to inspect and edit before forwarding them on to their destination. You return to the Facebook auth screen on your phone, which is still logged into Facebook as you. You touch “Authorize”. Burp Suite intercepts the HTTP request, but you allow it through unmolested. When the response comes back, you pause.

{% highlight text %}
HTTP/1.1 200 OK
Strict-Transport-Security: max-age=15552000; preload
X-Frame-Options: DENY
<SNIP>
Date: Sun, 23 Nov 2014 00:06:59 GMT
Connection: keep-alive
Content-Length: 239263

<script type="text/javascript">window.location.href="fb464891386855067:\/\/authorize\/#state=\u00257B\u002522is_open_session\u002522\u00253Atrue\u00252C\u002522is_active_session\u002522\u00253Atrue\u00252C\u002522com.facebook.sdk_client_state\u002522\u00253Atrue\u00252C\u0025223_method\u002522\u00253A\u002522browser_auth\u002522\u00252C\u0025220_auth_logger_id\u002522\u00253A\u00252231F9899A-8CE6-4D3E-AEA6-5B61BA29E674\u002522\u00257D&granted_scopes=public_profile\u00252Cbasic_info\u00252Cemail\u00252Ccontact_email\u00252Cuser_birthday\u00252Cuser_relationship_details\u00252Cuser_location\u00252Cuser_likes\u00252Cuser_activities\u00252Cuser_interests\u00252Cuser_education_history\u00252Cuser_photos\u00252Cuser_friends\u00252Cuser_about_me\u00252Cuser_status&denied_scopes=&signed_request=cmFlBtZQ_MhRPrMcABHR4xmfQ-0qaM3sErO2iHlgqME.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUR6QzFHamV1Z1otbnRlSUVYdkFfNWxNTXk5b1B3ZU9DbkVFcjd2RlJvWW9HSllKN2cxMlJKSnI3REZndEZncDdGZ2VYTjN5WnJjZk5PQ0JWLTl3MTZfcnBFZ2pyMlM4YjhET012OW9rNUR0eENzMFd2QThWcVlDcFJoU3oyU0RNcmwtMkJtQ1ZqYjcxMW0yVmtlelJlWm5NbjVBeE5kS0ZfSzN1MFlRX2dnODU1MHlXczBJbjlLcWMtQTVxMW1wYkI3dHAwRFJxeXczQ3A4b2NjVTFNSWNYNU9WUWZLeElOSkVobHFoUHNETEI1MTc1NGRzVVZwSFRIbGdTV2hNWWF6ZWpCck5wTEFTcDB0THhMUW1ISVJzSDlVVGJsQ2hFRWg5S19ab1JqcHVQRTZKQnJPRk9qTmRqU3pqQUpTTnBhdmQxMklPbm9HMU9DNUd5TmtUOHdHazljdFB3WHhkaXYyYmczQ1VIMmxpVEEiLCJpc3N1ZWRfYXQiOjE0MTY3MDExNTYsInVzZXJfaWQiOiIxMDAwMDc4MjQ5MTI3OTkifQ&access_token=CAAGm0PX4ZCpsBANFGB33gYaJZBuAngUFyOOb8LBtokVcYf307Vd2pYJhSZBp7EbKZCmnfGEOo7Iou1Hc7elC9v3OWHymcX25ZCtDOVJEkwQJi8eBQTXZBmPtrZBrSAhfZAOCmFwI4dmpPJ43KgePVEJWE8t8pdoiBBBJtvgICyaSDaHH5BOGoJvUZA2Oi3z7LuoApGO72uJOZBxTZBiX0k7YZCmEjhptZASEPNVQpKMakllGRngZDZD&expires_in=6844";</script>
{% endhighlight %}

This response is in a slightly different format to the that for the request you made from your laptop. It is what will tell Safari to pass control and an encrypted FB auth token back to Tinder. But you don’t want it to pass your auth token. You want it to pass Steve’s. You open Evernote and pull up the response from the identical auth request you made using Steve’s Facebook session from your laptop. You copy everything in this response from `fb464891386855067` up to `expires_in=6361`, and replace the corresponding section in the response that is still hanging in Burp Suite. You send this modified response, with Steve’s auth token buried and ciphered inside it, on its way to your phone.

For what feels like an eternity, time stands still.

And then Steve Steveington’s Tinder account appears before you. You did it. Tears of joy and relief streaming down your face, you change all of his photos to pictures of Gary Busey and tell all of his matches that he is having a pants party and they are invited.

<p style="text-align:center">
<img src="/images/fb/in.png" />
<img src="/images/fb/busey.jpg" />
</p>

<h3>Epilogue</h3>

For reasons that this narrator has been unable to fathom, 30-45 minutes after you gain entry to Steve’s Tinder account, a GET request to `facebook.com/v2.1/me?format=json&sdk=ios` returns `400`, with either:

{% highlight text %}
{"error":{"message":"Error validating access token: The session is invalid because the user logged out.","type":"OAuthException","code":190,"error_subcode":467}}
{% endhighlight %}

or

{% highlight text %}
{"error":{"message":"An active access token must be used to query information about the current user.","type":"OAuthException","code":2500}}
{% endhighlight %}

Tinder totally freaks and logs you out. You don’t know why.

It also turns out that Sandra, 28, is a huge Lethal Weapon fan. She and Steve now have 2 children and a condo in San Jose.