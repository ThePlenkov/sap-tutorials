export const tutorialConfig = {
  order: 1,
  tasks: [
    'security-basics',
    'input-validation',
    'sql-injection',
    'authorization',
    'secure-data',
    'xss-prevention',
    'security-logging',
    'cryptography',
    'secure-rfc',
    'code-injection',
    'performance-security',
    'dynamic-code-security',
    'backdoor-security'
  ],
  quizzes: {
    'security-basics': [
      {
        text: "What is the principle of least privilege?",
        options: [
          { text: "Giving users all possible access rights", correct: false },
          { text: "Granting minimum necessary permissions for tasks", correct: true },
          { text: "Not implementing any security checks", correct: false },
          { text: "Using default system settings", correct: false }
        ]
      },
      {
        text: "Which ABAP statement is used for authorization checks?",
        options: [
          { text: "CHECK AUTHORITY", correct: false },
          { text: "AUTHORITY-CHECK", correct: true },
          { text: "VALIDATE AUTH", correct: false },
          { text: "SEC_CHECK", correct: false }
        ]
      }
    ],
    'input-validation': [
      {
        text: "Which validation approach is more secure?",
        options: [
          { text: "Blacklist validation", correct: false },
          { text: "Whitelist validation", correct: true },
          { text: "No validation", correct: false },
          { text: "Random validation", correct: false }
        ]
      },
      {
        text: "When should input validation occur?",
        options: [
          { text: "After processing the data", correct: false },
          { text: "Just before saving to database", correct: false },
          { text: "As early as possible in the process", correct: true },
          { text: "Only when required by security audit", correct: false }
        ]
      }
    ],
    'sql-injection': [
      {
        text: "Which is the safest way to construct SQL queries in ABAP?",
        options: [
          { text: "String concatenation", correct: false },
          { text: "Using CONCATENATE", correct: false },
          { text: "Using OpenSQL with bind parameters", correct: true },
          { text: "Direct user input in WHERE clause", correct: false }
        ]
      },
      {
        text: "What is a prepared statement?",
        options: [
          { text: "A statement that's written in advance", correct: false },
          { text: "A precompiled SQL statement with placeholders", correct: true },
          { text: "A statement with hardcoded values", correct: false },
          { text: "A statement without WHERE clause", correct: false }
        ]
      }
    ],
    'backdoor-security': [
      {
        text: "Which is a common indicator of a potential backdoor?",
        options: [
          { text: "Regular authorization checks", correct: false },
          { text: "Hardcoded credentials or bypass conditions", correct: true },
          { text: "Standard SAP functions", correct: false },
          { text: "Documented code", correct: false }
        ]
      },
      {
        text: "What is the best practice for preventing backdoors?",
        options: [
          { text: "Skip code reviews", correct: false },
          { text: "Trust all developers", correct: false },
          { text: "Regular code audits and strict review processes", correct: true },
          { text: "Disable system monitoring", correct: false }
        ]
      },
      {
        text: "How should suspicious code changes be handled?",
        options: [
          { text: "Ignore them", correct: false },
          { text: "Implement immediately", correct: false },
          { text: "Review, document, and validate thoroughly", correct: true },
          { text: "Delete without review", correct: false }
        ]
      }
    ]
  }
};