// Utility function to parse stringified image arrays
export function parseImageUrl(imageString) {
  try {
    // Parse the stringified array
    const parsedArray = JSON.parse(imageString);
    return Array.isArray(parsedArray) ? parsedArray[0] : null;
  } catch (error) {
    console.error("Error parsing image string:", error);
    return null;
  }
}
