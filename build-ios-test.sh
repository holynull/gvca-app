#!/usr/bin/env bash

# ionic build --configuration=test --engin=android --platform=cordova
ionic cordova resources ios 
ionic cordova build ios --configuration=test

