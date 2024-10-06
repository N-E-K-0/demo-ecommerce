const API_URL = "https://api.escuelajs.co/graphql";

// Log in using GraphQL mutation
export const logIn = async (email, password) => {
  const query = `
    mutation {
      login(email: "${email}", password: "${password}") {
        access_token
        refresh_token
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  if (!response.ok || json.errors) {
    throw new Error(
      "Failed to log in: " +
        (json.errors ? json.errors[0].message : "Unknown error")
    );
  }

  const tokens = json.data.login;

  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("refresh_token", tokens.refresh_token);

  return tokens;
};

// Sign up (using addUser mutation, and log the user in afterward)
export const signUp = async (name, email, password, avatar = "") => {
  const query = `
    mutation {
      addUser(
        data: {
          name: "${name}",
          email: "${email}",
          password: "${password}",
          avatar: "${
            avatar || "https://api.lorem.space/image/face?w=150&h=220"
          }"
        }
      ) {
        id
        name
        email
        avatar
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  if (!response.ok || json.errors) {
    throw new Error(
      "Failed to sign up: " +
        (json.errors ? json.errors[0].message : "Unknown error")
    );
  }

  const user = json.data.addUser;
  const tokens = await logIn(email, password);

  return { user, tokens };
};

// Log out (clear tokens from localStorage)
export const logOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
