import Result from './Result';

type EmptyProps = {
  message?: string;
  title: string;
};

const Empty = ({ message, title }: EmptyProps) => {
  return <Result image={<img src={'assets/empty.svg'} alt='Logo' />} subTitle={message} title={title} />;
};

export default Empty;
