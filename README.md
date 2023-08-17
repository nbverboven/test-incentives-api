# Incentives API

## Requirements

* Node 18
* npm

## Local setup
```bash 
npm run start
```
starts a local instance of the application that listens on port `3000`.

To run all the project's tests:
```bash
npm run test
```

## TODOs

A basic response was implemented. However, a few things came up that need input
from someone with more domain knowledge.

### Add the benefit type to the API response

Since there're properties called "Benefit Type" in both the programs
and the benefits, further clarification is needed as to how to determine
the type of a given benefit, i.e. if both matter or only one.

### Take into consideration the benefit hierarchy

There appears to be at some benefits that have sub-benefits. In some cases, the parents
lack certain properties (Amount or Minimum, for example). Again, it's not obvious how to treat
them so, in the current implementation, this parent-child relationship is ignored.
