import { Button, Card, Checkbox, Flex, Form, Input, message, type FormProps } from 'antd';
import styles from '../assets/styles/login.module.css';
import { login } from './api/loginApi';
import { useNavigate, useLocation } from 'react-router-dom';
import type { FieldType } from './types';
import { useEffect, useState } from 'react';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleLoginSuccess = () => {
        const from = location.state?.from || "/inventory";
        navigate(from, { replace: true });
    };

    const handleLoginError = (msg: string) => {
        message.error(msg);
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        try {
            const res = await login(values);
            const { token } = res.data;
            localStorage.setItem("token", token);
            handleLoginSuccess();
        } catch (error) {
            console.log(error)
            handleLoginError("用户名或密码错误，请重试");
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {   
        // Check if the user is already logged in
        setDisabled(false);
    }, [disabled]);

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <div className={styles['login-container']}>

        <div className={styles['form-container']}>
            <Card className={styles['login-card']} title="Welcome to Book Store Management!">
                <Form name="loginForm"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        validateTrigger="onBlur"
                    >
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[
                        { required: true, message: 'Please input your password!' },
                        {
                            validator: (_, value) => {
                            if (!value) {
                                return Promise.resolve(); // 非空校验已由 required 规则处理
                            }
                            const is6Digits = /^\d{6}$/.test(value);
                            if (!is6Digits) {
                                return Promise.reject(new Error("密码必须为6位数字"));
                            }
                            return Promise.resolve();
                            },
                        },
                    ]}>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button block type="primary" htmlType="submit" disabled={disabled} className={styles['login-button']}>
                            Login
                        </Button>
                         or <a href="">Register now!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    </div>
  );
};

export default Login;
