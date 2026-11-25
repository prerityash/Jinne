# Zod: Explanation and Interview Report Schema

## 1. What is Zod?

**Zod is a TypeScript-first schema validation library** used to validate the structure and types of data at runtime.

Zod helps you define:

- What properties an object should contain.
- What data types those properties should have.
- Which values are allowed.
- Whether received data follows the expected structure.

For example, imagine your AI generates an interview report. You expect `matchScore` to be a number and `technicalQuestions` to be an array.

But the AI might return:

```js
{
  matchScore: "85", // String instead of number
  technicalQuestions: "JavaScript" // String instead of array
}
```

This data does not follow the expected structure. Zod helps detect these problems.

## 2. Common Zod functions

| Zod function | Purpose | Example |
|---|---|---|
| `z.object()` | Defines an object schema | `z.object({ name: z.string() })` |
| `z.string()` | Validates a string | `"Soumya"` |
| `z.number()` | Validates a number | `85` |
| `z.array()` | Validates an array | `["JS", "React"]` |
| `z.enum()` | Allows only specified values | `z.enum(["low", "high"])` |
| `.describe()` | Adds a description to a schema field | `.describe("Candidate score")` |
| `.optional()` | Makes a field optional | `z.string().optional()` |
| `.nullable()` | Allows `null` as a value | `z.string().nullable()` |
| `.parse()` | Validates data; throws an error if invalid | `schema.parse(data)` |
| `.safeParse()` | Validates data without throwing a validation error | `schema.safeParse(data)` |

## 3. Understanding the schema step by step

### A. `z.object()`

```js
const userSchema = z.object({
  name: z.string(),
  age: z.number()
});
```

This defines an expected object containing:

- `name`, which must be a string.
- `age`, which must be a number.

Valid data:

```js
{
  name: "Soumya",
  age: 21
}
```

Think of `z.object()` as defining the blueprint of an object.

### B. `z.array()`

Example from the interview report schema:

```js
technicalQuestions: z.array(
  z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string()
  })
)
```

This means:

1. `z.array()` requires the property to be an array.
2. `z.object()` requires every array element to be an object.
3. Each object must contain three string properties: `question`, `intention`, and `answer`.

Example of valid data:

```js
technicalQuestions: [
  {
    question: "What is React?",
    intention: "Test React fundamentals",
    answer: "Explain components, JSX and hooks."
  },
  {
    question: "What is Node.js?",
    intention: "Test backend knowledge",
    answer: "Explain its event-driven architecture."
  }
]
```

Every element must follow the same structure.

### C. `z.enum()`

```js
severity: z.enum(["low", "medium", "high"])
```

The value must be exactly one of the three specified strings.

Valid values:

```js
"low"
"medium"
"high"
```

Invalid values:

```js
"critical"
"very high"
10
```

Enums are useful when a field must use one of a fixed set of values.

### D. `.describe()`

```js
matchScore: z.number().describe(
  "A score between 0 and 100"
)
```

`.describe()` adds a human-readable description to a schema field.

In an AI-powered project, descriptions can provide context about what each field is intended to contain. Some AI structured-output integrations use these descriptions when communicating the schema to the model.

**Important:** `.describe()` does not enforce a business rule. The schema above still accepts `150`, because `z.number()` only checks that the value is a number.

To enforce a score between 0 and 100:

```js
matchScore: z.number().min(0).max(100)
```

## 4. How does validation happen?

Defining a schema does not automatically validate data. You must call `.parse()` or `.safeParse()`.

Example:

```js
const schema = z.object({
  name: z.string(),
  age: z.number()
});

const data = {
  name: "Soumya",
  age: 21
};

const result = schema.safeParse(data);

if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error);
}
```

- If the data is valid, `result.success` is `true`, and the validated data is available in `result.data`.
- If the data is invalid, `result.success` is `false`, and validation details are available in `result.error`.

### `.parse()` vs `.safeParse()`

```js
schema.parse(data);
```

- Returns validated data when successful.
- Throws a Zod error when validation fails.

```js
schema.safeParse(data);
```

- Returns an object describing success or failure.
- Does not throw a Zod validation error for invalid input.
- Useful when you want to handle validation errors with an `if/else` condition.

## 5. Understanding the complete interview report schema

The schema follows this hierarchy:

```text
interviewReportSchema — z.object()
│
├── matchScore — z.number()
│
├── technicalQuestions — z.array()
│   └── z.object()
│       ├── question — z.string()
│       ├── intention — z.string()
│       └── answer — z.string()
│
├── behavioralQuestions — z.array()
│   └── z.object()
│       ├── question — z.string()
│       ├── intention — z.string()
│       └── answer — z.string()
│
├── skillGaps — z.array()
│   └── z.object()
│       ├── skill — z.string()
│       └── severity — z.enum(["low", "medium", "high"])
│
├── preparationPlan — z.array()
│   └── z.object()
│       ├── day — z.number()
│       ├── focus — z.string()
│       └── tasks — z.array(z.string())
│
└── title — z.string()
```

## 6. Why use Zod in the Jinne project?

Jinne generates interview reports using AI. The expected workflow is:

1. The user provides a resume and job description.
2. AI generates an interview report.
3. Zod validates the generated data against the expected schema.
4. If valid, the application can use the structured report in the frontend.
5. If invalid, the application handles the validation error instead of blindly trusting the response.

Without validation, the frontend might receive unexpected data and fail when accessing properties that are missing or have the wrong type.

### Keep these three concepts separate

- **AI prompt:** Tells the model what to generate.
- **Zod schema:** Defines the structure and constraints the application expects.
- **Zod validation:** Checks whether the generated data follows that structure.

`.describe()` provides descriptive metadata; it does not guarantee that the AI follows the description.

## 7. Key takeaway

**Zod is a runtime data validator.** You define the expected data structure once, then validate incoming data against it.

For an AI-powered application, this helps ensure that generated responses have a predictable structure before the application uses them.
