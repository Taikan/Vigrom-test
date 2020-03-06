import { match } from "path-to-regexp";

export function addSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

export function stripHash(url: string) {
  const hashIndex = url.indexOf("#");
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

export function getHashPath() {
  const { href } = window.location;
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.substring(hashIndex + 1);
}

export function setHashPath(path: string) {
  window.location.hash = path;
}

export function replaceHashPath(path: string) {
  window.location.replace(stripHash(window.location.href) + "#" + path);
}

export function matchPath(pathname: string, path: string) {
  const matcher = match(path);
  return matcher(pathname);
}
