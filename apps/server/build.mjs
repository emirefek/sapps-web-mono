import { build } from "esbuild";

build({
  entryPoints: ["./src/main.ts"],
  bundle: true,
  platform: "node",
  target: "node18", // adjust as per your node version
  outfile: "./dist/bundle.cjs",
}).catch(() => process.exit(1));
