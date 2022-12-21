import { Button, Form, Input, notification } from 'antd';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const AuthUserForm = ({login = false}) => {

  let navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationRegisterError = (placement) => {
    api.error({
      message: `Erreur`,
      description: `L'utilisateur renseigné existe déjà! Veuillez en choisir un autre.`,
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


  const onFinish = (values) => {
    if(!login){
      AuthService.register(values.username, values.password).then((result) =>{
        if(result.error){
          openNotificationRegisterError('topRight');
        }else{
          navigate('/login');
        }
      })
    }else{
      let verifLogin = false;
      AuthService.login(values.username, values.password).then((result) =>{
        verifLogin = true;
        localStorage.setItem("user", JSON.stringify(result));
      }).then(()=> {
        navigate('/home');
        window.location.reload();
      })
      if(!verifLogin){
        openNotificationLoginError('topRight');
      }
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