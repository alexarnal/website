#!/bin/bash
# ============================================================
# run_batch.sh — Run one MCAT quiz batch via Claude Code
#
# Usage:
#   ./run_batch.sh              # run next batch manually
#   crontab -e                  # then add one of the lines below
#
# Cron examples (pick one):
#   0 */5 * * *  /full/path/to/run_batch.sh   # every 5 hours
#   0 9 * * *    /full/path/to/run_batch.sh   # once daily at 9am
#   0 9,14,19 * * *  /full/path/to/run_batch.sh  # 9am, 2pm, 7pm
# ============================================================

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$PROJECT_DIR/batch_log.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Starting batch..." | tee -a "$LOG_FILE"

cd "$PROJECT_DIR" || { echo "ERROR: Could not cd to $PROJECT_DIR" | tee -a "$LOG_FILE"; exit 1; }

# Stop early if all pages are done
NEXT_PAGE=$(python3 -c "import json; d=json.load(open('mcat/batch_state.json')); print(d['next_page'])" 2>/dev/null)
TOTAL=$(python3 -c "import json; d=json.load(open('mcat/batch_state.json')); print(d['total_pages'])" 2>/dev/null)

if [ -n "$NEXT_PAGE" ] && [ -n "$TOTAL" ] && [ "$NEXT_PAGE" -gt "$TOTAL" ]; then
  echo "[$TIMESTAMP] 🎉 All pages processed. Nothing to do." | tee -a "$LOG_FILE"
  exit 0
fi

claude -p "/next-batch" \
  --allowedTools "Read,Edit,Write,Bash" \
  --max-turns 10 \
  2>&1 | tee -a "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}

if [ $EXIT_CODE -eq 0 ]; then
  echo "[$TIMESTAMP] ✅ Batch completed successfully." | tee -a "$LOG_FILE"
else
  echo "[$TIMESTAMP] ❌ Batch failed with exit code $EXIT_CODE." | tee -a "$LOG_FILE"
fi

echo "---" >> "$LOG_FILE"
exit $EXIT_CODE
