# vault3 SDK

This project allows you to easly integrate vault3's token gating service into your own projects.

## Installation

Depending on where you want to integrate vault3, you should install the relevant package.

### React

```bash
npm install @vault3/sdk-react
```

### Vanilla JS

```bash
npm install @vault3/sdk-vanilla
```

## Usage

### React

```typescript
import { Vault3Provider, Vault3Config, TokenGates } from "@vault3/sdk-react";

const config = new Vault3Config({
    token: "AAAAAA",
    branding: {
        logo: "...",
        color: "#ffffff",
    }
});

export function MyTokenGates() {
    return <Vault3Provider config={config}>
        <TokenGates/>
    </Vault3Provider>;
}
```

### Vanilla JS

```html
<script src="https://cdn.vault3.io/sdk-vanilla"></script>
```

```javascript
vault3.configure({
  token: "AAAAAA",
  branding: {
    logo: "...",
    color: "#ffffff",
  },
});
vault3.renderTokenGates("#tokenGates");
```
## Run Locally
Install dependencies
```bash
  pnpm i
```
Start the development server
```bash
  pnpm dev
```
Run commands in specific workspaces use the prefix
```bash
  pnpm react dev
```
## Running Tests
To run tests, run the following command
```bash
  pnpm test
```
Or again only in a specific workspace
```bash
  pnpm react test
```
