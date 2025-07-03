import { Link } from "react-router";

export default function Login() {

  return (
    <div>
      <button>
        <Link to={`/Register`}>
            login
        </Link></button>
    </div>
  );
}