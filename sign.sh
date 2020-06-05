#!/usr/bin/env bash
rm ./GVCA.apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./keystore/my-release-key.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

 ~/Library/Android/sdk/build-tools/29.0.2/zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk GVCA.apk

