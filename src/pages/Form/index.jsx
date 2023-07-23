import { Form, Button, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.css';

export default function PageLayout() {
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
          //onFinish define a função a ser executada quando o formulário é submetido com sucesso
          onFinish={(values) => {
            console.log({ values });
          }}
          // OnFinishFailed define a função a ser executada quando ocorre um erro na submissão do formulário.
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="fullName"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Por favor coloque seu nome completo',
              },
              { whitespace: true },
              { min: 4 },
            ]}
            hasFeedback
          >
            <Input placeholder="Digite seu nome completo" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                message: 'Por favor escreva seu e-mail',
              },
              { type: 'email', message: 'Email inválido' },
            ]}
            hasFeedback
          >
            <Input placeholder="Digite seu e-mail" />
          </Form.Item>

          <Form.Item name="age" label="Age">
            <Input placeholder="Digite sua idade" />
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
            rules={[
              { type: 'url', message: 'Por favor digite uma url válida' },
            ]}
            hasFeedback
          >
            <Input placeholder="Digite seu website" />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="Introduction">
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
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}
