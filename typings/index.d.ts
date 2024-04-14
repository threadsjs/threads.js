/// <reference lib='dom' />
/**
 * @file threads.js typings
 * 
 * Post IDs must be strings, not numbers. This is because JavaScript represents all numbers as IEEE 754
 * floating point numbers, and as such cannot accurately represent integers greater than 2^53. This is
 * a limitation of JavaScript, not threads.js.
 */
