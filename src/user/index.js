import Id from "../Id/index.js";
import ipRegex from "ip-regex";
import sanitizeHtml from "sanitize-html";
import buildMakeUser from "./user.js";
import buildMakeSource from "./source.js";

const makeSource = buildMakeSource({ isValidIp });
const makeUser = buildMakeUser({ Id, sanitize, makeSource });

export default makeUser

function isValidIp (ip) {
	return ipRegex({exact: true}).test(ip)
}

function sanitize (text) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it']
  })
}


