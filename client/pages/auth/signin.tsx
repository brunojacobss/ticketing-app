import BasicForm from '../../src/components/basic-form';

const SignIn: React.FC = () => {
  return <BasicForm title="Sign In" url="/api/users/signin" />;
};

export default SignIn;
