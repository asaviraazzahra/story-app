const BASE_URL = 'https://story-api.dicoding.dev/v1';

export async function getStories(token) {
    const res = await fetch(`${BASE_URL}/stories`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.listStory;
}

export async function addStory(token, formData) {
    const res = await fetch(`${BASE_URL}/stories`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    return res.json();
}

export async function loginAndSaveToken(email, password) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data.loginResult.token;
}
