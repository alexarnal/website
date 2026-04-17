# MCAT Quiz Project

## What this is
An interactive MCAT study quiz app built as a single self-contained HTML file.
Questions are generated from handwritten study notes in a PDF and appended in batches.

## Key files
| File | Purpose |
|------|---------|
| `mcat/index.html` | The quiz app — all HTML/CSS/JS in one file |
| `mcat/batch_state.json` | Tracks which PDF pages have been processed |
| `mcat/UWORLD.pdf` | Source PDF of handwritten MCAT notes (153 pages) |

## How questions are stored
Questions live inside `mcat/index.html` as a JavaScript array near the top of the `<script>` block.
New questions are always inserted **before** this exact marker:

```
  // ===QUESTIONS_END===
```

Do NOT modify anything else in the HTML file. Only insert new question objects above that marker.

## Question format (must match exactly)
Each question is a JS object:
```js
{
  topic: "Biochem · AA Structure",      // "Subject · Subtopic"
  q: "The question text here?",
  opts: [
    "Option A text",
    "Option B text",
    "Option C text",
    "Option D text"
  ],
  ans: 0,   // zero-based index of the correct option
  exp: "<strong>Bold key term</strong> explanation text here. Use inline HTML for emphasis."
},
```

## Rules for question generation
- Generate 6–10 MCAT-style multiple choice questions per batch
- 4 answer options per question (A–D)
- Explanations must explain WHY the correct answer is right AND why the wrong ones are wrong
- Inline HTML is allowed in `exp` (use `<strong>` for key terms)
- Topics should reflect the section header visible in the notes (e.g. "Biochem · AA Structure")
- Do not duplicate questions already in the file — check the existing list before appending
- Maintain a comma after each closing `}` in the array

## Batch state
Always read `mcat/batch_state.json` before starting a batch and write it after completing one.
Never skip pages or re-process already-completed pages.
