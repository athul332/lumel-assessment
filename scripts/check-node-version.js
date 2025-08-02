/* eslint-disable no-undef */
// This script checks Node.js version and exits with error if less than 20
const [major] = process.versions.node.split('.').map(Number);
if (major < 20) {
  console.error(`ERROR: Node.js v${process.versions.node} detected. Version 20 or higher is required.`);
  process.exit(1);
}
