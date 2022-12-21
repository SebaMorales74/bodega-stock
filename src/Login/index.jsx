import React from 'react';
import { Layout, Image, Button, Form, Input } from 'antd';
import './_login.scss';
const { Content, Header, Footer } = Layout;
export default function Login() {
    const [form, setForm] = React.useState('login');

    const Formulario = () => {
        const onFinish = (values) => {
            console.log('Success:', values);
            window.location.replace('/');
            if (values.username === 'admin' && values.password === 'admin') {
                localStorage.setItem('permissions', 'admin');
            }
            else {
                localStorage.setItem('permissions', 'user');
            }
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div style={{ color: 'black' }} className='login-page'>
                <div className="form">
                    <div className="login">
                        <div style={{ fontSize: '1.5rem', margin: '2% 0% 6% 0%' }}>Iniciar sesión</div>
                        <Form
                            className='login-form'
                            name="login"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                labelCol={{
                                    span: 12,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Porfavor, ingresa un nombre de usuario.',

                                    },
                                ]}
                            >
                                <Input placeholder='Nombre de usuario' />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                labelCol={{
                                    span: 12,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Porfavor, ingresa una contraseña.',
                                    },
                                ]}
                            >
                                <Input.Password placeholder='Contraseña' />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    span: 24,
                                }}
                            >
                                <Button type="primary" className='loginButton' block htmlType="submit">
                                    Ingresar
                                </Button>
                            </Form.Item>
                        </Form>
                        <span className="message" style={{ fontSize: '1rem' }}>¿Olvidaste tú <a href='#' onClick={() => { setForm('forgot') }}>contraseña</a>?</span>
                    </div>
                </div>
            </div>
        );
    };

    const ForgotPassword = () => {
        const onFinish = (values) => {
            console.log('Success:', values);
            setForm('confirmation');
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div style={{ color: 'black' }} className='login-page'>
                <div className="form">
                    <div className="login">
                        <div style={{ fontSize: '1.5rem', margin: '2% 0% 6% 0%' }}>Recuperar contraseña</div>
                        <Form
                            className='login-form'
                            name="login"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="email"
                                labelCol={{
                                    span: 12,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Porfavor, ingresa un correo válido.',
                                        type: 'email'
                                    },
                                ]}
                            >
                                <Input placeholder='E-mail' />
                            </Form.Item>
                        </Form>
                        <span className="message" style={{ fontSize: '1rem' }}>¿Ya tienes una cuenta? <a href='#' onClick={() => { setForm('login') }}>Inicia sesión</a></span>
                    </div>
                </div>
            </div>
        );
    };

    const Confirmation = () => {
        return (
            <div style={{ color: 'black' }} className='login-page'>
                <div className="form">
                    <div className="login">
                        <div style={{ fontSize: '1.5rem', margin: '2% 0% 6% 0%' }}>Recuperar contraseña</div>
                        <div style={{ margin: '0% 0% 6% 0%' }}>Se ha enviado un enlace de recuperación a tu correo electronico.</div>
                        <span className="message" style={{ fontSize: '1rem' }}>¿Ya tienes una cuenta? <a href='#' onClick={() => { setForm('login') }}>Inicia sesión</a></span>
                    </div>
                </div>
            </div>
        );
    };

    const ChangeForm = (form) => {
        switch (form) {
            case 'login':
                return <Formulario />;
            case 'forgot':
                return <ForgotPassword />;
            case 'confirmation':
                return <Confirmation />;
            default:
                return <Formulario />;
        }
    }

    return (
        <Layout
            style={{ minHeight: '100vh', maxHeight: '100%' }}
        >
            <Header style={{ padding: '0' }} className='loginHeader'>
            </Header>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background loginbackground"
                    style={{
                        padding: 24
                    }}>
                        {ChangeForm(form)}
                </Content>
            </Layout>
            <Footer className='footer'><span style={{ float: 'left' }}>© 2022 Te Llega Altiro SpA.</span></Footer>
        </Layout>
    );
}