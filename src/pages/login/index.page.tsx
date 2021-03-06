import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);
  const router = useRouter();
  async function handleLogin() {
    const resp = await fetch(`${process.env.DOMAIN}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: emailRef.current?.value.trim(),
        password: passRef.current?.value.trim(),
      }),
    });
    const json = await resp.json();

    setMessage(json);
    if (resp.status === 200) {
      router.push('/admin');
    }
  }

  return (
    <div style={{ marginTop: 150 }}>
      {JSON.stringify(message)}
      <input type="text" placeholder="email" ref={emailRef} />
      <input type="password" placeholder="password" ref={passRef} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
