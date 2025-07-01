import { Button } from 'antd';

const Login = () => {
    const handleLogin = () => {
        // Handle login logic here
        console.log("Login button clicked");
        // You can redirect to the inventory list or perform other actions
    };
  return (
    <div>
      <h1>Login</h1>
      <Button type="primary" onClick={handleLogin}>Login</Button>
      {/* Render your login form here */}
    </div>
  );
};

export default Login;
