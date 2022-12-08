import { Button, Form, Input, notification } from 'antd';
import AuthService from '../../services/AuthService';
import { useEffect, useState } from "react";
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const AuthUserForm = ({login = false}) => {

  let navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() =>{
  UserService.getAllRegister().then((register) =>{
    setUsers(register.data);
  })
  }, [])

  const [api, contextHolder] = notification.useNotification();

  const openNotificationRegisterError = (placement) => {
    api.error({
      message: `Erreur`,
      description: `Le pseudo renseigné existe déjà! Veuillez en choisir un autre.`,
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

  console.log(users)

  const onFinish = (values) => {
    if(!login){
      let verifUsername = false;
      users.forEach(i => {
        if(values.username === i.username && verifUsername === false){
          openNotificationRegisterError('topRight');
          verifUsername = true;
        }
      });
      if(verifUsername === false){
        openNotificationRegisterSucess('topRight');
        AuthService.register(values.username, values.password);
        navigate('/login');
      }
    }else{
      let verifUser = false;
      users.forEach(i =>{
        if(values.username === i.username && values.password === i.password && verifUser === false){
          openNotificationLoginSucess('topRight');
          AuthService.login(values.username, values.password);
          navigate('/home');
          verifUser = true;
        }
      })
      if(verifUser === false){
        openNotificationLoginError('topRight');
      }
    }
  };
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