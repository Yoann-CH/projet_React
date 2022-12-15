import { Button, Form, Input, notification } from 'antd';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthUserForm = ({login = false}) => {

  let navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const [user, setUser] = useState({});

    useEffect(() =>{
        const u = JSON.parse(localStorage.getItem('user'));
        setUser(u);
        if(!user){
          if(user.error){
            openNotificationRegisterError('topRight');
          }else{
            openNotificationRegisterSucess('topRight');
            navigate('/home');
          }
        }
    }, [])

  const openNotificationRegisterError = (placement) => {
    api.error({
      message: `Erreur`,
      description: `L'utilisateur renseigné existe déjà! Veuillez en choisir un autre.`,
      placement,
    });
  };

  const openNotificationRegisterSucess = (placement) => {
    api.success({
      message: `Succès`,
      description: `Votre compte a bien été créé.`,
      placement,
    });
  };

  const openNotificationLoginError = (placement) => {
    api.error({
      message: `Erreur`,
      description: `Le pseudo ou le mot de passe renseigné est incorrect!`,
      placement,
    });
  };

  const openNotificationLoginSucess = (placement) => {
    api.success({
      message: `Succès`,
      description: `Vous êtes connectés.`,
      placement,
    });
  };

  const onFinish = (values) => {
    if(!login){
      AuthService.register(values.username, values.password).then(() =>{
        window.location.reload();
      })
    }else{
      AuthService.login(values.username, values.password);
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
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
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Envoyer
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AuthUserForm;