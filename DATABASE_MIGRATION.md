# Database Migration for LLM Integration

## Overview
This migration adds the `llm_response` column to the `card` table to store AI-generated analysis.

## SQL Migration

Add the following column to your `card` table:

```sql
-- Add llm_response column to card table
ALTER TABLE card 
ADD COLUMN llm_response JSONB;

-- Add comment for documentation
COMMENT ON COLUMN card.llm_response IS 'AI-generated structured analysis of the card';

-- Optional: Add index for queries (if needed in future)
-- CREATE INDEX idx_card_llm_response ON card USING GIN (llm_response);
```

## Rollback (if needed)

To remove the column:

```sql
ALTER TABLE card DROP COLUMN llm_response;
```

## Notes

- The column is nullable by default (cards without AI analysis will have NULL)
- Uses JSONB type for efficient storage and querying
- Existing cards will have NULL llm_response until they are updated
- No data loss occurs during migration - only adds new functionality

## Verification

After running the migration, verify the column exists:

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'card' AND column_name = 'llm_response';
```

Expected result:
```
column_name   | data_type | is_nullable
llm_response  | jsonb     | YES
```