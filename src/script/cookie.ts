// From https://git.colormatic.org/zakarya/gist/src/branch/main/cookie.ts

// The magic cookie system is so stupid

export function setCookie(
	cname: string,
	cvalue: string,
	opts: {
		sameSite?: "Lax" | "Strict" | "None";
		path?: string;
		maxAgeSeconds?: number;
		secure?: boolean;
	} = {},
) {
	const sameSite = opts.sameSite ?? "Lax";
	const path = opts.path ?? "/";
	const parts = [`${cname}=${cvalue}`, `Path=${path}`, `SameSite=${sameSite}`];

	if (typeof opts.maxAgeSeconds === "number") {
		parts.push(`Max-Age=${opts.maxAgeSeconds}`);
	}

	if (opts.secure ?? sameSite === "None") {
		parts.push("Secure");
	}

	document.cookie = parts.join("; ");
}

// Credit: https://www.w3schools.com/js/js_cookies.asp
export function getCookie(cname: string): string {
	const name = cname + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
