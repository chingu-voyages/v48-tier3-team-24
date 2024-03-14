import bcrypt from 'bcrypt';

// https://www.npmjs.com/package/bcrypt

/**
 * Used to hash a plain-text string.
 * Hash passwords or other sensitive data using this function
 * before storing them in the database.
 * @param {string} plaintext 
 * @param {number} saltSize 
 * @returns {string} hash
 */
export const hash = async (plaintext:string, saltSize = 10) => {
	const salt = await bcrypt.genSalt(saltSize);
	return await bcrypt.hash(plaintext, salt);
};

/**
 * Compares a plain-text string with a hash to determine
 * if they are equal.
 * @param {string} plaintext 
 * @param {string} hash 
 * @returns {boolean} true if the plain-text string and hash are equal
 */
export const compare = async (plaintext:string, hash:string) => {
	return await bcrypt.compare(plaintext, hash);
};