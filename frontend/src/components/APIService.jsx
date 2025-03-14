export default class APIService {
    static getBaseURL() {
        return import.meta.env.VITE_API_URL || 'http://localhost:8000';
    }

    static async GetArticles(token) {
        try {
            const response = await fetch(`${this.getBaseURL()}/api/articles/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching articles: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in GetArticles:', error);
            return [];
        }
    }


    // Update an article
    static UpdateArticle(article_id, body, token) {
        return fetch(`${this.getBaseURL()}/api/articles/${article_id}/`, {
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
        return fetch(`${this.getBaseURL()}/api/articles/`, {
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
        return fetch(`${this.getBaseURL()}/api/articles/${article_id}/`, {
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
    static async LoginUser(body) {
        try {
            const response = await fetch(`${this.getBaseURL()}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in LoginUser:', error);
            throw error; // Re-throw the error for the caller to handle
        }
    }

    // Register a new user
    static RegisterUser(body) {
        return fetch(`${this.getBaseURL()}/api/users/`, {
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