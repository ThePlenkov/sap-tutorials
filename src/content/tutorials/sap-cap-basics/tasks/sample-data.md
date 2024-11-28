---
title: "Adding Sample Data"
description: "Populate your CAP service with sample data and test the endpoints"
tutorialId: "sap-cap-basics"
order: 5
---

# Adding Sample Data

Let's populate our service with sample data and test it.

## Create Sample Data

1. Create `db/data/my.bookshop-Books.csv`:
   ```csv
   ID;title;author;stock
   1;Wuthering Heights;Emily Brontë;100
   2;Jane Eyre;Charlotte Brontë;50
   3;Pride and Prejudice;Jane Austen;75
   ```

## Testing the Service

1. Restart the service:
   ```bash
   cds watch
   ```

2. Test endpoints:
   - Browse books: GET `/catalog/Books`
   - Single book: GET `/catalog/Books(1)`

## Next Steps

Congratulations! You've completed the basic SAP CAP tutorial.