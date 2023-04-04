import Local from "./Local";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

class API {
  // Log in
  static async loginUser(username, password) {
    let body = { email: username, pass: password };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    let response;
    try {
      response = await fetch(baseUrl + "/auth/login", options);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = { ok: false, error: err.message };
    }
    return response;
  }

  // Create a new user
  static async createUser(email, password) {
    let body = { email: email, pass: password };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    let response;
    try {
      response = await fetch(baseUrl + "/auth/signup", options);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = { ok: false, error: err.message };
    }
    return response;
  }

  // General purpose get
  static async getContent(route) {
    // Prepare URL and options
    let options = { method: "GET", headers: {} };

    // Add JWT token for protected content
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }
    let response;
    try {
      response = await fetch(baseUrl + route, options);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = { ok: false, error: err.message };
    }
    return response;
  }

  // General purpose delete
  static async deleteContent(route) {
    // Prepare options
    let options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    // Add JWT token (if it exists) in case content is protected
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }
    let response;
    try {
      response = await fetch(baseUrl + route, options);
      console.log(response);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = { ok: false, error: err.message };
    }

    return response;
  }

  // General purpose edit
  static async updateContent(route, updatedObject) {
    console.log("updated object");
    console.log(updatedObject);
    // Prepare options
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedObject),
    };
    // Add JWT token (if it exists) in case content is protected
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }
    let response;
    try {
      response = await fetch(baseUrl + route, options);
      console.log(response);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = { ok: false, error: err.message };
    }

    return response;
  }

  // General purpose add
  static async addContent(route, newObject) {
    // Prepare options
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObject),
    };
    // Add JWT token (if it exists) in case content is protected
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }
    let response;
    try {
      response = await fetch(baseUrl + route, options);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = { ok: false, error: err.message };
    }
    return response;
  }
}

export default API;
