export default class APIService {
    // Get list of articles
    static GetArticles(token) {
        return fetch(`http://127.0.0.1:8000/api/articles/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Error fetching articles: ${resp.statusText}`);
            }
            return resp.json();
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
    }

    // Update an article
    static UpdateArticle(article_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Error updating article: ${resp.statusText}`);
            }
            return resp.json();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Insert a new article
    static InsertArticle(body, token) {
        return fetch(`http://127.0.0.1:8000/api/articles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Error inserting article: ${resp.statusText}`);
            }
            return resp.json();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Delete an article
    static DeleteArticle(article_id, token) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Error deleting article: ${resp.statusText}`);
            }
            return resp.status === 204 ? null : resp.json();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Login a user
    static LoginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Login failed: ${resp.statusText}`);
            }
            return resp.json();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Register a new user
    static RegisterUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Registration failed: ${resp.statusText}`);
            }
            return resp.json();
        })
        .catch((error) => {
            console.error(error);
        });
    }
}