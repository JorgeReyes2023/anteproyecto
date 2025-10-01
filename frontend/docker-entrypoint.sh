#!/bin/sh

# Replace environment variables in JavaScript files
# This allows dynamic configuration at runtime

if [ -f /usr/share/nginx/html/main.*.js ]; then
    # Replace API URL if provided
    if [ ! -z "$API_URL" ]; then
        find /usr/share/nginx/html -name "*.js" -exec sed -i "s|http://localhost:3000|$API_URL|g" {} \;
    fi
    
    # Replace other environment variables as needed
    if [ ! -z "$MQTT_WS_URL" ]; then
        find /usr/share/nginx/html -name "*.js" -exec sed -i "s|ws://localhost:9001|$MQTT_WS_URL|g" {} \;
    fi
fi

# Execute the original command
exec "$@"