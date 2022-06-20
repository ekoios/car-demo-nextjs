import { GetServerSideProps } from 'next';

import withServerSideProps from 'hoc/withServerSideProps';

function Home() {
  return <div>home</div>;
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default Home;
