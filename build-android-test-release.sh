#!/usr/bin/env bash

# ionic build --configuration=test --engin=android --platform=cordova
ionic cordova resources android 
ionic cordova build android --configuration=test --release

