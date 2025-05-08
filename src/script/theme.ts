/*/
 * I know that having a source file this small is a bit silly,
 * but I think it's probably a good way to do this. Since multiple
 * components need the theme enum, why not define it in one place.
 * I also think it's funny for a source file to have more comments
 * than code. This will probably be changed in a future refactor.
 *
 * Also JavaScript enums suck (hot take)
/*/

export var themes = {
	LIGHT: "light",
	DARK: "dark",
	AUTO: "auto",
};
