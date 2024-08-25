# Uno SaaS Demo Generator

## Overview

The Uno SaaS Demo Generator is a web application designed to streamline the process of creating test case files for Uno SaaS demos. This tool replaces the manual process of running scripts, converting CSV files to Excel, and manually downloading them.

## Features

- Select SPO Code from a dropdown
- Input the desired number of records
- Choose the number of files to generate (1, 5, or 10)
- Generate and download Excel (.xlsx) files within seconds

## Thrtdeyty78uch Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui (based on Radix UI)
- xlsx (for Excel file generation)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/uno-saas-demo-generator.git
   ```

2. Navigate to the project directory:
   ```
   cd uno-saas-demo-generator
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and visit `http://localhost:3000`

## Usage

1. Select the desired SPO Code from the dropdown.
2. Enter the number of records you want to generate.
3. Choose the number of files to generate using the chip buttons (1, 5, or 10).
4. Click the "Generate and Download Excel" button.
5. Wait for the files to be generated and downloaded (usually within 1-2 seconds).

## Customization

To add or modify SPO Codes, edit the `spoCodes` array in the `UnoDemoGenerator.tsx` file.

To change the data generation logic, modify the `generateSampleData` function in the `src/lib/dataGenerator.ts` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
