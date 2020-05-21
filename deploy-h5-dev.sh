#!/usr/bin/env bash

scp -r ./www/* 192.168.0.10:/data/www/app/

aws s3 cp ./info.test.json s3://test.plo.one/mobile/info.json 
