export default function(string) {
  try {
    JSON.parse(string);
    return true;
  } catch (err) {
    return false;
  }
}
