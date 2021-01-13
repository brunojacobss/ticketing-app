import BasicForm from '../../src/components/basic-form';

const SignUp: React.FC = () => {
  return <BasicForm title="Sign Up" url="/api/users/signup" />;
};

export default SignUp;
