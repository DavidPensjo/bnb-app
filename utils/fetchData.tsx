export async function fetchData() {
    const response = await fetch('/api/data');
    const result = await response.json();
    return result;
  }