#!/usr/bin/env bash

keytool -genkey -v -keystore keystore/my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

