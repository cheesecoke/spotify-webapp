"use strict";
// To compile: tsc createPage.ts
// To run: node createPage.js
// Ensure @types/node is installed for proper type definitions.
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const readline = require("readline");
// Helper function to ask questions via the command line.
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}
async function main() {
  // Ask for the new page name.
  const pageName = (await askQuestion("Enter the new page name: ")).trim();
  if (!pageName) {
    console.error("Page name cannot be empty.");
    process.exit(1);
  }
  // Ask whether to include the Page Heading.
  const includePageHeadingAnswer = (
    await askQuestion("Include Page Heading? (Y/n): ")
  )
    .trim()
    .toLowerCase();
  const includePageHeading =
    includePageHeadingAnswer === "" || includePageHeadingAnswer.startsWith("y");
  // Ask whether to include the Top Element.
  const includeTopElementAnswer = (
    await askQuestion("Include Top Element? (Y/n): ")
  )
    .trim()
    .toLowerCase();
  const includeTopElement =
    includeTopElementAnswer === "" || includeTopElementAnswer.startsWith("y");
  // Ask for the overflow value (defaults to true).
  const overflowAnswer = (
    await askQuestion("Set overflow (true/false, default true): ")
  )
    .trim()
    .toLowerCase();
  let overflow = true;
  if (
    overflowAnswer === "false" ||
    overflowAnswer === "f" ||
    overflowAnswer === "no" ||
    overflowAnswer === "n"
  ) {
    overflow = false;
  }
  // Create the new directory inside src/pages.
  const pagesDir = path.join(process.cwd(), "src", "pages", pageName);
  fs.mkdirSync(pagesDir, { recursive: true });
  console.log(`Created directory: ${pagesDir}`);
  // Write index.tsx which re-exports the main page file.
  const indexContent = `export { default } from "./${pageName}";\n`;
  fs.writeFileSync(path.join(pagesDir, "index.tsx"), indexContent);
  console.log(`Created index.tsx`);
  // Write the main page file {PageName}.tsx.
  const mainContent = generateMainPageContent(
    pageName,
    includePageHeading,
    includeTopElement,
    overflow,
  );
  fs.writeFileSync(path.join(pagesDir, `${pageName}.tsx`), mainContent);
  console.log(`Created ${pageName}.tsx`);
  // If a Page Heading is wanted, create the PageHeading.tsx file.
  if (includePageHeading) {
    const pageHeadingContent = generatePageHeadingContent();
    fs.writeFileSync(
      path.join(pagesDir, "PageHeading.tsx"),
      pageHeadingContent,
    );
    console.log(`Created PageHeading.tsx`);
  }
  // If a Top Element is wanted, create the TopElement.tsx file.
  if (includeTopElement) {
    const topElementContent = generateTopElementContent();
    fs.writeFileSync(path.join(pagesDir, "TopElement.tsx"), topElementContent);
    console.log(`Created TopElement.tsx`);
  }

  // Update App.tsx to add new route
  try {
    const appPath = path.join(process.cwd(), "src", "App.tsx");
    let appContent = fs.readFileSync(appPath, "utf-8");
    const componentName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    // Add import statement for the new page component if not already present
    const newImport = `import ${componentName} from "./pages/${pageName}/${pageName}";
`;
    if (!appContent.includes(newImport)) {
      const lastImportIndex = appContent.lastIndexOf("import ");
      if (lastImportIndex !== -1) {
        const insertPosition = appContent.indexOf("\n", lastImportIndex) + 1;
        appContent =
          appContent.slice(0, insertPosition) +
          newImport +
          appContent.slice(insertPosition);
      } else {
        appContent = newImport + appContent;
      }
    }

    // Prepare the new route line with proper indentation
    const newRoute = `    <Route path="${pageName}" element={<${componentName} />} />\n`;

    // Insert the new route before the last closing </Route> tag
    const lastClosingTag = appContent.lastIndexOf("</Route>");
    if (lastClosingTag !== -1) {
      appContent =
        appContent.slice(0, lastClosingTag) +
        newRoute +
        appContent.slice(lastClosingTag);
    } else {
      console.error("Could not find closing </Route> tag in App.tsx.");
    }

    fs.writeFileSync(appPath, appContent);
    console.log(`Updated App.tsx with new route.`);
  } catch (err) {
    console.error("Error updating App.tsx:", err);
  }

  console.log("Page creation complete!");
}
// Template for the main page file.
function generateMainPageContent(
  pageName,
  includePageHeading,
  includeTopElement,
  overflow,
) {
  const pageHeadingImport = includePageHeading
    ? `import PageHeading from "./PageHeading";`
    : "";
  const topElementImport = includeTopElement
    ? `import TopElement from "./TopElement";`
    : "";
  const pageHeadingProp = includePageHeading
    ? "pageHeading={<PageHeading />}"
    : "pageHeading={null}";
  const topElementProp = includeTopElement
    ? "topElement={<TopElement />}"
    : "topElement={null}";
  return `import PageLayout from "components/Layouts/PageLayout";
${pageHeadingImport}
${topElementImport}

const ${pageName} = () => {
  return (
    <PageLayout
      overflow={${overflow}}
      ${pageHeadingProp}
      ${topElementProp}
    >
      <h1>Page Created - ${pageName}</h1>
      <p>Welcome to your new page!</p>
    </PageLayout>
  );
};

export default ${pageName};
`;
}
// Template for the PageHeading component.
function generatePageHeadingContent() {
  return `import styled from "@emotion/styled";

const Wrapper = styled.h1\`
  margin: 0px 30px;
\`;

const PageHeading = () => {
  return <Wrapper>Good Morning</Wrapper>;
};

export default PageHeading;
`;
}
// Template for the TopElement component.
function generateTopElementContent() {
  return `import styled from "@emotion/styled";

const Wrapper = styled.h1\`
  margin: 0px 30px;
\`;

const TopElement = () => {
  return <Wrapper>Create Top Element here.</Wrapper>;
};

export default TopElement;
`;
}
main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
