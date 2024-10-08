import crypto from 'crypto';

function generate128BitString() {
    // Generate 16 random bytes (128 bits)
    const buffer = crypto.randomBytes(128); 
    // Convert to hexadecimal string
    const hexString = buffer.toString('hex'); 
    return hexString;
}

// Usage
const randomString = generate128BitString();
console.log('Generated 128-bit string:', randomString);
