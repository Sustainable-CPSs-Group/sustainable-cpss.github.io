import { withBase as prefixPath } from "./base-path.mjs";

export const withBase = (path: string) => prefixPath(path, import.meta.env.BASE_URL);
