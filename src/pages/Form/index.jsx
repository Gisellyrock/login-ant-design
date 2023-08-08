import { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function PageForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const token = localStorage.getItem('usuario_logado');

    // Extrair valores do formulário
    const { fullName, email, age, website, introduction, username, password } =
      values;

    setLoading(true);

    // Criar objeto de dados para enviar na solicitação
    const data = {
      name: fullName, // Renomeado para fullName
      email,
      age,
      website,
      username,
      password,
      introduction,
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('User registered successfully!');
        setLoading(false);
        navigate('/layout');
      } else {
        console.error('Error registering user:', response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="fullName" // Renomeado para fullName
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your full name',
              },
              { whitespace: true },
              { min: 4 },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                message: 'Please enter your email',
              },
              { type: 'email', message: 'Invalid email format' },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item name="age" label="Age">
            <Input placeholder="Enter your age" />
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
            rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
            hasFeedback
          >
            <Input placeholder="Enter your website" />
          </Form.Item>

          <Form.Item name="introduction" label="Introduction">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}
