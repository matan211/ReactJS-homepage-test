# React.dev Automated Testing Suite

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone ReactJS.dev test
cd react-dev-testing-suite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

## 🏃‍♂️ Running the Tests

### Run All Tests

```bash
npx playwright test
```

Or run only ReactJS.dev tests (without the example):
```bash
npx playwright test ReactJS.spec.js
```

### Run Tests with GUI

```bash
npx playwright test --ui
```

### Run Specific Test File

```bash
npx playwright test ReactJS.spec.js
```

### Run Specific Test Case

```bash
npx playwright test ReactJS.spec.js -g "Should have a header and footer"
```

### Generate Test Report

```bash
npx playwright show-report
```

## 🧪 Test Cases

### 1. Page Structure Test
- Validates presence of header and footer elements

### 2. Theme Toggle Test
- Tests dark/light mode switching functionality

### 3. Keyboard Navigation Test
- Ensures all navigation elements are keyboard accessible

### 4. Search Functionality Test
- Comprehensive testing of search feature with favorites

## 🎯 Locator Strategy

My main strategy was to get the locators using PlayWright GUI and also with some help from document.getElement from the browser's console.
