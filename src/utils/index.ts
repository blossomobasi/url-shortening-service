import randomstring from "randomstring";

export function generateShortenedURL() {
    return randomstring.generate(7);
}
