import { Button, Checkbox, Form, Input } from 'antd';
import './style.css';

export default function Login() {
  const onFinish = async (values) => {
    // Extrair os valores de username e password do objeto 'values'
    const { username, password } = values;

    // Criar o objeto de dados para enviar na solicitação
    const data = {
      username: username,
      password: password,
    };

    try {
      // Fazer a solicitação POST usando fetch
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Converter o objeto para uma string JSON
      });

      // Verificar se a resposta foi bem-sucedida
      if (response.ok) {
        const responseData = await response.json(); // Converter a resposta para JSON
        localStorage.setItem('usuario_logado', responseData.token);
        window.location.href = '/layout';
      } else {
        alert('usuario/senha invalidos');
      }
    } catch (error) {
      alert('usuario/senha invalidos');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        className="app"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Por favor coloque seu username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor coloque a sua senha',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
