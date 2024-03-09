import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch('http://localhost:3000/', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        setUser(data);
      });
  }, []);

  if (!user) {
    // If the user data hasn't been loaded yet, render a loading message
    return <div>Loading...</div>;
  }

  // Render the user data
  return (
    <div>
      <h1>Welcome to Unison!</h1>
      <p>You are logged in as {user.username}</p>
    </div>
  );
}

export default App;