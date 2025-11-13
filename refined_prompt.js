/**
 * Converts a string to lowerCamelCase format.
 *
 * @param {string} input - The string to convert
 * @returns {string} The converted lowerCamelCase string
 * @throws {Error} If input is not a string
 *
 * ASSUMPTIONS:
 * - Word separators: spaces, tabs, newlines, hyphens (-), underscores (_)
 * - Non-separator punctuation (e.g., '.', ',', '!') is preserved within words
 * - Leading/trailing whitespace is trimmed before processing
 * - Multiple consecutive separators are treated as a single separator
 * - Numbers are preserved as-is within words
 * - First word starts lowercase; subsequent words start uppercase
 * - If input contains only separators, returns empty string
 */
function toCamelCase(input) {
    // Validate input type
    if (typeof input !== 'string') {
        throw new Error(`Invalid input type: expected string, got ${typeof input}`);
    }

    // Handle empty string
    if (input.length === 0) {
        return '';
    }

    // Trim leading/trailing whitespace
    const trimmed = input.trim();

    // If trimmed string is empty, return empty string
    if (trimmed.length === 0) {
        return '';
    }

    // Split by word separators: spaces, tabs, newlines, hyphens, underscores
    // Using regex to split on one or more separator characters
    const words = trimmed.split(/[\s\-_]+/);

    // Filter out empty strings resulting from consecutive separators or pure separator strings
    const filteredWords = words.filter(word => word.length > 0);

    // If no valid words remain, return empty string
    if (filteredWords.length === 0) {
        return '';
    }

    // Convert to camelCase: first word lowercase, subsequent words capitalized
    return filteredWords
        .map((word, index) => {
            if (index === 0) {
                // First word: lowercase entire word
                return word.toLowerCase();
            }
            // Subsequent words: capitalize first letter, lowercase the rest
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

// ============================================================================
// UNIT TEST SUITE
// ============================================================================

function runTests() {
    const tests = [
        // Basic cases
        { input: 'hello world', expected: 'helloWorld', description: 'basic two-word' },
        { input: 'hello-world', expected: 'helloWorld', description: 'hyphen separator' },
        { input: 'hello_world', expected: 'helloWorld', description: 'underscore separator' },
        { input: 'hello  world', expected: 'helloWorld', description: 'multiple spaces' },

        // Complex cases
        { input: ' THIS_is-a MixED example', expected: 'thisIsAMixEDExample', description: 'mixed separators and case' },
        { input: 'a_b-c d', expected: 'aBCD', description: 'single-letter words' },

        // Edge cases
        { input: '', expected: '', description: 'empty string' },
        { input: '   ', expected: '', description: 'only whitespace' },
        { input: '___---   ', expected: '', description: 'only separators' },
        { input: 'single', expected: 'single', description: 'single word' },
        { input: '  leading', expected: 'leading', description: 'leading whitespace' },
        { input: 'trailing  ', expected: 'trailing', description: 'trailing whitespace' },

        // Punctuation preservation
        { input: 'hello.world', expected: 'hello.world', description: 'dot within word (preserved)' },
        { input: 'hello-world.test', expected: 'helloWorld.test', description: 'dot preserved across split' },

        // Numbers
        { input: 'hello123world', expected: 'hello123world', description: 'numbers in single word' },
        { input: 'hello 123 world', expected: 'hello123World', description: 'number as separate word' },

        // Mixed whitespace
        { input: 'hello\tworld\ntest', expected: 'helloWorldTest', description: 'tab and newline separators' },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach(({ input, expected, description }) => {
        try {
            const result = toCamelCase(input);
            if (result === expected) {
                console.log(`✓ PASS: ${description}`);
                passed++;
            } else {
                console.log(`✗ FAIL: ${description}`);
                console.log(`  Input: "${input}"`);
                console.log(`  Expected: "${expected}"`);
                console.log(`  Got: "${result}"`);
                failed++;
            }
        } catch (error) {
            console.log(`✗ ERROR: ${description} - ${error.message}`);
            failed++;
        }
    });

    // Error cases
    const errorCases = [
        { input: null, description: 'null input' },
        { input: undefined, description: 'undefined input' },
        { input: 123, description: 'number input' },
        { input: {}, description: 'object input' },
        { input: [], description: 'array input' },
    ];

    errorCases.forEach(({ input, description }) => {
        try {
            toCamelCase(input);
            console.log(`✗ FAIL: ${description} - should have thrown error`);
            failed++;
        } catch (error) {
            console.log(`✓ PASS: ${description} - correctly threw error`);
            passed++;
        }
    });

    console.log(`\n${passed} passed, ${failed} failed`);
}

// Uncomment to run tests:
// runTests();

// Export for use in other modules
/**
 * Converts a string to kebab-case format.
 *
 * @param {string} input - The string to convert
 * @returns {string} The converted kebab-case string
 * @throws {TypeError} If input is not a string
 *
 * BEHAVIOR:
 * - Converts camelCase and PascalCase to separate words
 * - Replaces spaces, underscores, and hyphens with single hyphens
 * - Collapses multiple consecutive separators into one
 * - Ensures all letters are lowercase
 * - Returns empty string for empty input or input with only separators
 *
 * @example
 * toKebabCase('helloWorld'); // 'hello-world'
 * toKebabCase('HelloWorld'); // 'hello-world'
 * toKebabCase('hello_world'); // 'hello-world'
 * toKebabCase('hello world'); // 'hello-world'
 * toKebabCase('hello--world'); // 'hello-world'
 */
function toKebabCase(input) {
    // Validate input type
    if (typeof input !== 'string') {
        throw new TypeError(`Invalid input type: expected string, got ${typeof input}`);
    }

    // Handle empty string
    if (input.length === 0) {
        return '';
    }

    // Trim leading/trailing whitespace
    const trimmed = input.trim();

    // If trimmed string is empty, return empty string
    if (trimmed.length === 0) {
        return '';
    }

    // Insert hyphens before uppercase letters in camelCase/PascalCase
    const withHyphens = trimmed.replace(/([a-z])([A-Z])/g, '$1-$2');

    // Replace underscores, spaces with hyphens
    const normalized = withHyphens.replace(/[\s_]+/g, '-');

    // Collapse multiple consecutive hyphens into one
    const collapsed = normalized.replace(/-+/g, '-');

    // Remove leading/trailing hyphens and convert to lowercase
    const kebab = collapsed.replace(/^-+|-+$/g, '').toLowerCase();

    return kebab;
}

// Test cases
console.log('=== toKebabCase Tests ===');
console.log(toKebabCase('helloWorld')); // 'hello-world'
console.log(toKebabCase('HelloWorld')); // 'hello-world'
console.log(toKebabCase('hello_world')); // 'hello-world'
console.log(toKebabCase('hello world')); // 'hello-world'
console.log(toKebabCase('hello--world')); // 'hello-world'
console.log(toKebabCase('myVariableName')); // 'my-variable-name'
console.log(toKebabCase('MY_CONSTANT_VALUE')); // 'my-constant-value'
console.log(toKebabCase('   ')); // ''
console.log(toKebabCase('')); // ''
try { toKebabCase(123); } catch (e) { console.log('Error caught:', e.message); }
function toDotCase(input) {
    // Validate input type
    if (typeof input !== 'string') {
        throw new Error(`Invalid input type: expected string, got ${typeof input}`);
    }

    // Handle empty string
    if (input.length === 0) {
        return '';
    }

    // Trim leading/trailing whitespace
    const trimmed = input.trim();

    // If trimmed string is empty, return empty string
    if (trimmed.length === 0) {
        return '';
    }

    // Split by word separators: spaces, tabs, newlines, hyphens, underscores
    const words = trimmed.split(/[\s\-_]+/);

    // Filter out empty strings
    const filteredWords = words.filter(word => word.length > 0);

    // If no valid words remain, return empty string
    if (filteredWords.length === 0) {
        return '';
    }

    // Convert to dot.case: all lowercase, joined by dots
    return filteredWords
        .map(word => word.toLowerCase())
        .join('.');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { toCamelCase, toDotCase };
}