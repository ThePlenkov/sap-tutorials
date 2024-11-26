---
title: "Extend the Data Model"
description: "Learn how to extend your CAP data model using AI assistance"
---

# Extend the Data Model

One of the major advantages of using CDS over traditional HANA calculation views is its compatibility with generative AI. While calculation views require manual modeling, CDS models can be quickly generated and modified using AI tools like ChatGPT or Claude. This significantly speeds up development and reduces errors.

## Why CDS + AI?

1. **Natural Language to Code**: Describe your requirements in plain English, get CDS code
2. **Quick Iterations**: Rapidly prototype and refine your data model
3. **Best Practices**: AI tools can suggest optimized structures and relationships
4. **Documentation**: Automatically generate comprehensive annotations
5. **Consistency**: Maintain uniform naming and modeling patterns

## Using AI to Extend the Model

1. Here's a prompt you can use with ChatGPT or Claude:

   ```text
   I have a CAP (Cloud Application Programming) data model for a bookshop:

   namespace my.bookshop;
   entity Books {
     key ID : Integer;
     title : String;
     stock : Integer;
   }

   Please extend it by:
   1. Adding an Authors entity with fields: ID, name, birthDate, biography
   2. Adding a genre field to Books (like 'Fiction', 'Science', etc.)
   3. Creating an association between Books and Authors (author_ID in Books table)
   4. Including sample data for both Authors and updated Books
   5. Adding proper annotations for documentation
   ```

2. The AI will suggest something like this. Update your `db/schema.cds`:

   ```cds
   namespace my.bookshop;

   /** Authors who write books */
   entity Authors {
     key ID : Integer;
     /** Full name of the author */
     name : String;
     /** Author's date of birth */
     birthDate : Date;
     /** Short biography of the author */
     biography : String(1000);
     /** Books written by this author */
     books : Association to many Books on books.author = $self;
   }

   /** Books available in the bookshop */
   entity Books {
     key ID : Integer;
     /** Title of the book */
     title : String;
     /** Current stock level */
     stock : Integer;
     /** Genre of the book */
     genre : String enum {
       Fiction;
       Science;
       Biography;
       Technology;
     };
     /** Author of the book */
     author : Association to Authors;
   }
   ```

3. Create sample data in `db/data/my.bookshop-Authors.csv`:
   ```csv
   ID;name;birthDate;biography
   1;Emily Brontë;1818-07-30;English novelist best known for Wuthering Heights
   2;Charlotte Brontë;1816-04-21;English novelist best known for Jane Eyre
   ```

4. Update your Books data in `db/data/my.bookshop-Books.csv`:
   ```csv
   ID;title;stock;author_ID;genre
   1;Wuthering Heights;100;1;Fiction
   2;Jane Eyre;500;2;Fiction
   ```

## Understanding the Changes

1. **New Entity**: Added Authors with basic information
2. **Enhanced Books**:
   - Added genre as an enumeration
   - Added author relationship with foreign key
3. **Associations**: 
   - One-to-many relationship between Authors and Books
   - Bidirectional navigation using backlink
4. **Documentation**: Added JSDoc comments for better API documentation
5. **Sample Data**: Updated to include author relationships and genres

## Testing the Changes

1. Deploy the changes:
   ```bash
   cds deploy
   ```

2. Test the new model:
   ```bash
   cds watch
   ```

Access: http://localhost:4004/catalog/Authors

Try these relationships:
- Get an author's books: `/catalog/Authors(1)/books`
- Get a book's author: `/catalog/Books(1)/author`
- Filter books by genre: `/catalog/Books?$filter=genre eq 'Fiction'`

## Next Steps

Now that we've extended our data model, you can:
- Add more entities and relationships
- Enhance the service with custom logic
- Use the new associations in your queries
- Add more genres to the enumeration

> 💡 **Tip**: You can ask AI to help with more complex data modeling tasks, like adding categories, reviews, or order management.