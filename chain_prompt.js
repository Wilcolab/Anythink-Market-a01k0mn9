/**
 * Convert a string to kebab-case (lowercase words separated by hyphens).
 *
 * This handles:
 * - camelCase and PascalCase (e.g. "camelCase" -> "camel-case", "PascalCase" -> "pascal-case")
 * - underscores, spaces, and hyphens as separators (they become single hyphens)
 * - collapsing multiple separators into one
 * - trimming leading/trailing separators
 *
 * Edge cases:
 * - Non-string input throws a TypeError.
 * - Empty strings or strings that contain only separators/spaces return an empty string.
 *
 * Examples:
 * toKebabCase("camelCaseExample") -> "camel-case-example"
 * toKebabCase("  Mixed_delimiter Example--Text ") -> "mixed-delimiter-example-text"
 *
 * @param {string} input - The string to convert to kebab-case.
 * @returns {string} The kebab-cased string, or an empty string for empty/only-separators input.
 * @throws {TypeError} If the input is not a string.
 */
function toKebabCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('toKebabCase: expected a string input');
    }

    // Quick trim to handle leading/trailing whitespace
    const trimmed = input.trim();
    if (trimmed === '') return '';

    let result = trimmed
        // Insert hyphen between a lower/digit and an upper (e.g. "fooBar" -> "foo-Bar")
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        // Insert hyphen between an upper-sequence and a following Upper+lower (e.g. "HTMLParser" -> "HTML-Parser")
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        // Replace underscores, spaces, and existing hyphens (one or more) with a single hyphen
        .replace(/[_\s-]+/g, '-')
        // Lowercase everything
        .toLowerCase()
        // Remove leading/trailing hyphens that may have been introduced
        .replace(/^-+|-+$/g, '');

    // If after removing hyphens nothing remains, treat as empty
    if (result.replace(/-/g, '') === '') return '';

    return result;
}

/* Example test cases */
console.log(toKebabCase('camelCaseExample'));            // -> "camel-case-example"
console.log(toKebabCase('PascalCaseExample'));           // -> "pascal-case-example"
console.log(toKebabCase('mixed_delimiter Example--Text'));// -> "mixed-delimiter-example-text"
console.log(toKebabCase('__leading__and--trailing--'));  // -> "leading-and-trailing"
console.log(toKebabCase('   '));                          // -> "" (only spaces -> empty)
console.log(toKebabCase('---__'));                       // -> "" (only separators -> empty)
try {
    console.log(toKebabCase(123)); // invalid input
} catch (err) {
    console.log(err.message); // -> "toKebabCase: expected a string input"
}