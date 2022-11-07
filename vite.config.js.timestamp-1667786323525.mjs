// vite.config.js
import { readFileSync } from "fs";
import { sveltekit } from "@sveltejs/kit/vite";
import { timeFormat } from "d3";
import path from "path";
import svg from "vite-plugin-svgstring";
import dsv from "@rollup/plugin-dsv";
var { version } = JSON.parse(readFileSync("package.json", "utf8"));
var timestamp = timeFormat("%Y-%m-%d-%H:%M")(new Date());
var config = {
  define: {
    __VERSION__: JSON.stringify(version),
    __TIMESTAMP__: JSON.stringify(timestamp)
  },
  plugins: [
    sveltekit(),
    dsv(),
    svg()
  ],
  resolve: {
    alias: {
      "$actions": path.resolve("./src/actions"),
      "$components": path.resolve("./src/components"),
      "$data": path.resolve("./src/data"),
      "$routes": path.resolve("./src/routes"),
      "$stores": path.resolve("./src/stores"),
      "$styles": path.resolve("./src/styles"),
      "$svg": path.resolve("./src/svg"),
      "$utils": path.resolve("./src/utils")
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWljaGVsbGVtY2doZWUvRGVza3RvcC9jb2RlL2Vtb3Rpb24td2hlZWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9taWNoZWxsZW1jZ2hlZS9EZXNrdG9wL2NvZGUvZW1vdGlvbi13aGVlbC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWljaGVsbGVtY2doZWUvRGVza3RvcC9jb2RlL2Vtb3Rpb24td2hlZWwvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG5pbXBvcnQgeyB0aW1lRm9ybWF0IH0gZnJvbSBcImQzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHN2ZyBmcm9tIFwidml0ZS1wbHVnaW4tc3Znc3RyaW5nXCI7XG5pbXBvcnQgZHN2IGZyb20gXCJAcm9sbHVwL3BsdWdpbi1kc3ZcIjtcblxuY29uc3QgeyB2ZXJzaW9uIH0gPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhcInBhY2thZ2UuanNvblwiLCBcInV0ZjhcIikpO1xuY29uc3QgdGltZXN0YW1wID0gdGltZUZvcm1hdChcIiVZLSVtLSVkLSVIOiVNXCIpKG5ldyBEYXRlKCkpO1xuXG5jb25zdCBjb25maWcgPSB7XG5cdGRlZmluZToge1xuXHRcdF9fVkVSU0lPTl9fOiBKU09OLnN0cmluZ2lmeSh2ZXJzaW9uKSxcblx0XHRfX1RJTUVTVEFNUF9fOiBKU09OLnN0cmluZ2lmeSh0aW1lc3RhbXApXG5cdH0sXG5cdHBsdWdpbnM6IFtcblx0XHRzdmVsdGVraXQoKSxcblx0XHRkc3YoKSxcblx0XHRzdmcoKVxuXHRdLFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdFwiJGFjdGlvbnNcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvYWN0aW9uc1wiKSxcblx0XHRcdFwiJGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvY29tcG9uZW50c1wiKSxcblx0XHRcdFwiJGRhdGFcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvZGF0YVwiKSxcblx0XHRcdFwiJHJvdXRlc1wiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9yb3V0ZXNcIiksXG5cdFx0XHRcIiRzdG9yZXNcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvc3RvcmVzXCIpLFxuXHRcdFx0XCIkc3R5bGVzXCI6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3N0eWxlc1wiKSxcblx0XHRcdFwiJHN2Z1wiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9zdmdcIiksXG5cdFx0XHRcIiR1dGlsc1wiOiBwYXRoLnJlc29sdmUoXCIuL3NyYy91dGlsc1wiKVxuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVSxTQUFTLG9CQUFvQjtBQUMvVixTQUFTLGlCQUFpQjtBQUMxQixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUVoQixJQUFNLEVBQUUsUUFBUSxJQUFJLEtBQUssTUFBTSxhQUFhLGdCQUFnQixNQUFNLENBQUM7QUFDbkUsSUFBTSxZQUFZLFdBQVcsZ0JBQWdCLEVBQUUsSUFBSSxLQUFLLENBQUM7QUFFekQsSUFBTSxTQUFTO0FBQUEsRUFDZCxRQUFRO0FBQUEsSUFDUCxhQUFhLEtBQUssVUFBVSxPQUFPO0FBQUEsSUFDbkMsZUFBZSxLQUFLLFVBQVUsU0FBUztBQUFBLEVBQ3hDO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sWUFBWSxLQUFLLFFBQVEsZUFBZTtBQUFBLE1BQ3hDLGVBQWUsS0FBSyxRQUFRLGtCQUFrQjtBQUFBLE1BQzlDLFNBQVMsS0FBSyxRQUFRLFlBQVk7QUFBQSxNQUNsQyxXQUFXLEtBQUssUUFBUSxjQUFjO0FBQUEsTUFDdEMsV0FBVyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3RDLFdBQVcsS0FBSyxRQUFRLGNBQWM7QUFBQSxNQUN0QyxRQUFRLEtBQUssUUFBUSxXQUFXO0FBQUEsTUFDaEMsVUFBVSxLQUFLLFFBQVEsYUFBYTtBQUFBLElBQ3JDO0FBQUEsRUFDRDtBQUNEO0FBRUEsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
