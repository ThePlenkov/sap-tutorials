---
title: "Creating Your First CAP Project"
description: "Initialize and understand the structure of a new CAP project"
tutorialId: "sap-cap-basics"
order: 2
---

# Creating Your First CAP Project

Let's create a new CAP project from scratch and understand its structure.

## Project Initialization

1. Create a new directory and initialize the project:
   ```bash
   mkdir bookshop
   cd bookshop
   cds init
   ```

2. Examine the generated project structure:
   ```
   bookshop/
   ├── app/
   ├── db/
   ├── srv/
   ├── package.json
   └── README.md
   ```

## Understanding the Structure

- `app/`: UI applications
- `db/`: Database models and data
- `srv/`: Service definitions and implementations
- `package.json`: Project configuration

## Next Steps

In the next task, we'll define our first data model.