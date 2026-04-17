# /next-batch

Process the next batch of pages from the MCAT notes PDF and append new questions to the quiz.

## Steps

1. **Read `mcat/batch_state.json`** to get `next_page`, `batch_size`, `total_pages`, and `pdf_path`.
   - If the file doesn't exist, create it with the defaults shown at the bottom of this file.
   - If `next_page` > `total_pages`, print "🎉 All pages have been processed!" and stop.

2. **Calculate page range**: `start = next_page`, `end = min(next_page + batch_size - 1, total_pages)`

3. **Read pages `start` through `end`** from the PDF at `pdf_path`.
   - These are handwritten notes. Read each page as an image carefully.
   - Transcribe all content: headings, bullet points, starred items, colored annotations,
     diagrams (describe them in text), and any red/highlighted callouts.

4. **Generate questions** following the rules in `CLAUDE.md`:
   - 6–10 MCAT-style 4-option MCQs
   - Prioritize starred/highlighted items — those are high-yield
   - Write clear explanations that reinforce learning
   - Use the topic format: `"Subject · Subtopic"` based on the section header in the notes

5. **Append questions to `mcat/index.html`**:
   - Find the exact marker: `  // ===QUESTIONS_END===`
   - Insert all new question objects (with trailing commas) immediately before that marker
   - Do NOT touch any other part of the HTML file

6. **Update `mcat/batch_state.json`**:
   - Set `next_page` to `end + 1`
   - Increment `batches_completed` by 1
   - Append `{"pages": "start-end", "questions_added": N, "date": "YYYY-MM-DD"}` to the `history` array

7. **Print a summary**:
   ```
   ✅ Batch complete!
   📄 Pages processed: X–Y
   ❓ Questions added: N
   📊 Progress: Y / 153 pages (Z%)
   ➡️  Next batch starts at page: Y+1
   ```

---

## Default `mcat/batch_state.json` (create if missing)
```json
{
  "pdf_path": "mcat/UWORLD.pdf",
  "next_page": 4,
  "batch_size": 5,
  "total_pages": 153,
  "batches_completed": 1,
  "history": [
    {"pages": "2-3", "questions_added": 10, "date": "2026-04-17"}
  ]
}
```

> Pages 2–3 were already processed in the initial setup. Page 1 is the cover page (no content).
