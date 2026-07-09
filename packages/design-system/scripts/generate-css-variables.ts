import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { brandALightTheme } from "@dt/design-tokens";

import { toCSSVariables } from "../src/utils/toCSSVariables";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, "../variables.css");

const variablesCSS = toCSSVariables(brandALightTheme);

fs.writeFileSync(outputPath, variablesCSS, "utf-8");
console.warn(`Generated CSS variables at ${outputPath}`);
