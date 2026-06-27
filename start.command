#!/bin/bash
# ============================================================
#  AETHER — local dev server
#  Double-click this file (or run it) to serve the site.
#  A static server is required because the site uses ES modules
#  and local @font-face files, which browsers block over file://.
# ============================================================

cd "$(dirname "$0")" || exit 1
PORT=4321

echo ""
echo "  AETHER  →  http://localhost:$PORT"
echo "  Press Ctrl+C to stop."
echo ""

# Open the browser a moment after the server boots
( sleep 1; open "http://localhost:$PORT" ) >/dev/null 2>&1 &

# Python 3 ships with macOS dev tools; fall back to python if needed
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT"
else
  python -m SimpleHTTPServer "$PORT"
fi
