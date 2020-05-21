aws s3 sync ./www/ s3://test.plo.one/mobile/ --delete

aws s3 cp ./info.test.json s3://test.plo.one/mobile/info.json 

# cloudflare cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/3f7563adc4facddebeb39937c01c8b33/purge_cache" \
     -H "X-Auth-Email: ploutoz@126.com" \
     -H "X-Auth-Key: 717decda00fd3566687446de4449ce40f79ac" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
