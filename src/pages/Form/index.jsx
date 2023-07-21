import { Form, Button, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.css';

export default function PageLayout() {
  return (
    <div className="App">
      <header className="App-header">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="fullName"
            label="Nome completo"
            rules={[
              {
                required: true,
                message: 'Por favor coloque seu nome completo',
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Digite seu nome" />
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

          <Form.Item name="age" label="Idade">
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
          <Form.Item name={['user', 'introduction']} label="Introdução">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}
