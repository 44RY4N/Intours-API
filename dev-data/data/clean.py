import json
import re

def to_camel_case(key):
    key = re.sub(r'[^a-zA-Z0-9 ]+', '', key)
    parts = key.strip().split()
    return parts[0].lower() + ''.join(p.capitalize() for p in parts[1:])

def convert_keys(obj):
    if isinstance(obj, dict):
        return {to_camel_case(k): convert_keys(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [convert_keys(item) for item in obj]
    return obj

with open("csvjson.json", "r", encoding="utf-8") as f:
    data = json.load(f)

converted = convert_keys(data)

# Save to new file
with open("csvjson_camel.json", "w", encoding="utf-8") as f:
    json.dump(converted, f, indent=2, ensure_ascii=False)
