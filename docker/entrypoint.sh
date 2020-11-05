#!/usr/bin/env bash

pm2 start ciao-ssr --name='ssr' -- \
  --config=/ssr-config/config.json \
  --watch
pm2 save
tail -f /dev/null