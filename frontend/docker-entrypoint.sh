#!/bin/sh

# Replace environment variables in JavaScript files
# This allows dynamic configuration at runtime

# Check if JavaScript files exist
if find /usr/share/nginx/html -name "*.js" -type f | grep -q .; then
    echo "Applying runtime configuration..."
    
    # Replace API URL if provided
   if [ -n "$API_URL" ]; then
        echo "Setting API_URL to $API_URL"
        find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|http://localhost:3000|$API_URL|g" {} \;
    fi
    
    # Replace MQTT WebSocket URL if provided
    if [ -n "$MQTT_WS_URL" ]; then
        echo "Setting MQTT_WS_URL to $MQTT_WS_URL"
        find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|ws://localhost:9001|$MQTT_WS_URL|g" {} \;
    fi
else
    echo "No JavaScript files found, skipping runtime configuration"
fi

# Execute the original command
exec "$@"