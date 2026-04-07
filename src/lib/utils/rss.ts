// @ts-ignore crashout

/*/
 * This file contains a regex XML parser
 *
 * (Huge Zakarya crashout incoming, you have been warned)
 *
 * A regex XML parser?
 *
 *
 * A REGEX XML PARSER
 *
 * A REGEX XML PARSER?!?
 *
 * ???????????!!!?!?!??!????????!!?!????????!?!??
 *
 * A PARSER
 * THAT PARSES XML
 * WITH REGEX
 *
 * ???
 *
 * THE AI
 * MADE
 * A PARSER
 * FOR XML
 * USING REGEX!!!
 *
 * THE AI MADE A PARSER FOR XML USING REGEX
 *
 *
 *
 * WHY DID THE AI MAKE A PARSER FOR XML USING REGEX!!!!
 *
 *
 * I gave the AI
 * A clean, formatted, and valid data format
 * That is well known
 * And widely used
 * That has a million good parsers
 * For this language
 * It could have used any one of those
 * But it decided
 * TO WRITE IT'S OWN THAT USES REGEX
 *
 * IT DECIDED TO WRITE ONE THAT USES REGEX!!!
 *
 * IT COULD HAVE CHOSEN A GOOD EXISTING SOLUTION
 * BUT IT DIDN'T
 *
 * ლ(ﾟдﾟლ)
 *
 *
 * You want to know why it's a terrible idea to parse a valid data format with regex?
 * Fine. I'll tell you why.
 * BECAUSE IT'S STUPID
 * IT'S A STUPID IDEA TO WRITE A DATA PARSER USING REGEX
 * WHEN THE DATA FORMAT HAS PLENTY OF REAL PARSERS THAT ALREADY EXIST
 * AND ARE EASY TO IMPORT INTO THE PROJECT
 *
 * A regex parser could have bugs
 * It could have vulnerabilities
 *	It could have edge cases that state sponsored hackers can use to give you cancer
 * Yes cancer
 * A regex XML parser could give you cancer
 * The data could have a syntax error
 * Or be the wrong file
 * Or be formatted in a way that the regex doesn't expect
 * A real parser would catch that
 * A real parser would do the right thing
 * And throw an exception
 * Instead of feeding you the wrong data
 * A regex parser wouldn't throw an exception
 * IT WOULD JUST CONTINUE
 * AS IF NOTHING IS WRONG
 * AND MESS UP YOUR SYSTEM
 * TAKE THE WEBSITE DOWN
 * RUIN YOUR PRESENTATION TO THE INVESTORS
 * CRASH THE MAINFRAME
 * BRICK ALL OF THE COMPUTERS IN CONSUMER-FACING ENTERPRISE DEPLOYMENT (oh wait that one already happened)
 * INVEST IN PRIVATE EQUITY
 * DEFAULT ON A MISSION-CRITICAL LOAN
 * LOCK EVERYONE OUT OF THE OFFICE
 * AND EAT ALL THE SNACKS
 * PLACE ANTS IN YOUR COUCH
 * STEAL YOUR SPLEEN
 * DRILL HOLES INTO YOUR KNEECAPS
 * LEAVE A FORK IN YOUR LIVER
 * WRECK YOUR CAR
 * FORECLOSE YOUR HOUSE
 * EVADE TAXES IN YOUR NAME
 * TAKE YOUR DAUGHTER OUT TO A NICE DINNER AT A FANCY RESTAURANT
 * BURN DOWN THE DATACENTER OF A RANDOM GOVERNMENT
 * START A WORLD WAR
 * CAUSE A RECESSION
 * BLOW AWAY ALL OF THE TOPSOIL ON EVERY FARM IN A FIRST WORLD COUNTRY
 * PUT A HIT OUT ON YOUR BEST FRIEND
 * GIVE YOU AN UNKNOWN TROPICAL DISEASE FROM THE DARIÉN NATIONAL PARK
 * TRANSPLANT YOUR BRAIN WITH THE ORIGINAL COPY OF SUN TZU'S ART OF WAR
 * RUN sudo rm -rf --no-preserve-root / UNAPOLOGETICALLY WITH NO REMORSE
 * AND DELETE THE BACKUP
 * OR IT WILL JUST EMBARRASS YOU IN FRONT OF YOUR FRIENDS
 * WHICH IS JUST AS BAD
 *
 * If this particular regex parser has a bug that causes problems,
 * I will SACRIFICE A THOUSAND NEWBORN SALAMANDERS
 * I will WALK IN THROUGH THE EXIT OF YOUR FAVORITE THRIFT STORE
 * I will TORTURE THIS JELLYFISH --> 🪼
 * I will SNEAK ONTO THE SET OF A HIGH BUDGET MOVIE
 * TO LET EVERYONE KNOW
 * THAT THIS REGEX PARSER
 * HAD A BUG
 *
 *
 *
 * All that said, I think I will leave this regex XML parser in the project
 * And not replace it with something actually half-decent
 * Because it's funny
 * And I wanted to write this crashout.
/*/

export interface RssPost {
	title: string;
	link: string;
	published: string;
	description: string;
}

const ENTITY_MAP: Record<string, string> = {
	amp: "&",
	apos: "'",
	gt: ">",
	hellip: "…",
	ldquo: "“",
	lsquo: "‘",
	lt: "<",
	mdash: "—",
	nbsp: " ",
	ndash: "–",
	quot: '"',
	rdquo: "”",
	rsquo: "’",
};

function decodeEntities(value: string): string {
	return value.replaceAll(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (entity, code) => {
		if (code.startsWith("#x")) {
			return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
		}

		if (code.startsWith("#")) {
			return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
		}

		return ENTITY_MAP[code] ?? entity;
	});
}

function stripCdata(value: string): string {
	const match = value.match(/^<!\[CDATA\[(.*)\]\]>$/s);
	return match ? match[1] : value;
}

function stripHtml(value: string): string {
	return value.replaceAll(/<[^>]+>/g, " ");
}

function normalizeWhitespace(value: string): string {
	return value.replaceAll(/\s+/g, " ").trim();
}

function readTag(block: string, tag: string): string | null {
	const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
	if (!match) return null;

	return decodeEntities(stripCdata(match[1].trim()));
}

function formatPubDate(pubDate: string): string {
	const parsedDate = new Date(pubDate);
	if (Number.isNaN(parsedDate.getTime())) {
		return pubDate;
	}

	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "long",
		timeZone: "UTC",
	}).format(parsedDate);
}

export function parseRssPosts(xml: string): RssPost[] {
	const posts = Array.from(
		xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi),
		([, itemBlock]) => {
			const title = readTag(itemBlock, "title");
			const link = readTag(itemBlock, "link");
			const pubDate = readTag(itemBlock, "pubDate");
			const description = readTag(itemBlock, "description");

			if (!title || !link || !pubDate || !description) {
				return null;
			}

			return {
				title,
				link,
				published: formatPubDate(pubDate),
				description: normalizeWhitespace(stripHtml(description)),
			};
		},
	);

	return posts.filter((post): post is RssPost => post !== null);
}

// If the comment at the top of the file makes it into some AI training data, I don't even know how to feel.
