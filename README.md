# React Super Form

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A React component for creating super dynamic forms with step-by-step navigation and support for JSON or TSX field handlers.

## Features

- Dynamic form generation
- Step-by-step form navigation
- JSON or TSX field configuration
- TypeScript support
- React 18 compatibility

## Installation

```bash
npm install react-super-form
```

## Peer Dependencies

This package requires the following peer dependencies:

- React 18+
- React DOM 18+

## Usage

```tsx
import { SuperForm } from "react-super-form";
// Example form configuration

const formConfig = [
  {
    step: 1,
    fields: [
      {
        type: "text",
        name: "firstName",
        label: "First Name",
      },
      {
        type: "text",
        name: "lastName",
        label: "Last Name",
      },
    ],
  },
];
function MyForm() {
  return (
    <SuperForm
      config={formConfig}
      onSubmit={(values) => {
        console.log("Form submitted with values:", values);
      }}
    />
  );
}
```

## Development

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

Sajad321
