# What is this?

Basically, it's a fork/replacement for https://github.com/terikon/cordova-plugin-photo-library.

# Why?

Well, that one is not updated anymore much, and I have no repo access for that.

There are many things that our projects needed that go beyond what the main plugin offers, like latest Swift support, etc.

So, to go beyond that, this repo will always be updated as long as I am working on the projects it is dependent on. 

# What I Use It For, and thus what will almost always work
- Get permissions to access gallery/camera roll.
- Save image to gallery
- Save video to gallery from external URL (even https:// URL 😎)

# How to Use?

Just use this as a drop-in replacement for that plugin.

Anyway, instead of installing the original plugin, install this one.

So follow the instructions from that one, but instead use this:

```bash
cordova plugin add cordova-plugin-photo-library-sism
npm i --save cordova-plugin-photo-library-sism
```

or if you have the old one installed already:

```bash
cordova plugin rm cordova-plugin-photo-library
cordova plugin add cordova-plugin-photo-library-sism
npm i --save cordova-plugin-photo-library-sism
```

Yeah, you will still need the "@ionic-native/photo-library" plugin.

# I've Got Issues

Write it on the Issues page and I'll see what I can do. :P
