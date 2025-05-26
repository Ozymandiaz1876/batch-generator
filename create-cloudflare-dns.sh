#!/bin/bash

# Help function
show_help() {
    echo "Usage: $0 -s SUBDOMAIN -d DOMAIN -t TYPE -c CONTENT [-p PROXIED]"
    echo
    echo "Create a DNS record in Cloudflare"
    echo
    echo "Options:"
    echo "  -s SUBDOMAIN    Subdomain name (e.g., 'app' for app.example.com)"
    echo "  -d DOMAIN       Main domain name (e.g., 'example.com')"
    echo "  -t TYPE         Record type (A, CNAME, TXT, etc.)"
    echo "  -c CONTENT      Record content (IP address or target)"
    echo "  -p PROXIED      Optional: Whether to proxy through Cloudflare (true/false, default: true)"
    echo "  -k TOKEN        Cloudflare API token"
    echo
    echo "Example:"
    echo "  $0 -s app -d example.com -t CNAME -c myapp.fly.dev -k your_api_token"
    exit 1
}

# Parse arguments
while getopts "s:d:t:c:p:k:h" opt; do
    case $opt in
        h)
            show_help
            ;;
        s)
            SUBDOMAIN="$OPTARG"
            ;;
        d)
            DOMAIN="$OPTARG"
            ;;
        t)
            TYPE="$OPTARG"
            ;;
        c)
            CONTENT="$OPTARG"
            ;;
        p)
            PROXIED="$OPTARG"
            ;;
        k)
            CF_API_TOKEN="$OPTARG"
            ;;
        \?)
            show_help
            ;;
    esac
done

# Validate required arguments
if [ -z "$DOMAIN" ] || [ -z "$TYPE" ] || [ -z "$CONTENT" ] || [ -z "$CF_API_TOKEN" ]; then
    echo "Error: Missing required arguments"
    show_help
fi

# Set default values
PROXIED=${PROXIED:-true}
NAME=${SUBDOMAIN:+$SUBDOMAIN.}$DOMAIN
NAME=${NAME%%.}  # Remove trailing dot if no subdomain

# First, get the zone ID for the domain
echo "Fetching zone ID for domain $DOMAIN..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" | jq -r '.result[0].id')

if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" = "null" ]; then
    echo "Error: Could not find zone ID for domain $DOMAIN"
    exit 1
fi

# Create the DNS record
echo "Creating DNS record..."
echo "Name: $NAME"
echo "Type: $TYPE"
echo "Content: $CONTENT"
echo "Proxied: $PROXIED"

RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data "{
        \"type\":\"$TYPE\",
        \"name\":\"$NAME\",
        \"content\":\"$CONTENT\",
        \"proxied\":$PROXIED
     }")

SUCCESS=$(echo $RESPONSE | jq -r '.success')

if [ "$SUCCESS" = "true" ]; then
    echo "DNS record created successfully!"
else
    echo "Error: Failed to create DNS record"
    echo "Response: $RESPONSE"
    exit 1
fi
