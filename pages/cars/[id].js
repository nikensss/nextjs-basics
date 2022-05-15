import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Car({ car }) {
  const router = useRouter();

  const { id } = router.query;

  // for SEO friendly pages, use the Head component and add a title, meta
  // tags and the usual <head> information
  return (
    <>
      <Head>
        <title>
          {car.color} {car.id}
        </title>
      </Head>

      <h1>Hello, {id}</h1>
      <Image src={car.image} alt={car.id} width="1280" height="720" />
    </>
  );
}

// will run before the page is rendered and the results will be passed to the
// component in this file
export const getStaticProps = async ({ params }) => {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const car = await req.json();

  return { props: { car } };
};

// tells next which dunamic pages to render
export const getStaticPaths = async () => {
  const req = await fetch('http://localhost:3000/cars.json');
  const data = await req.json();
  console.log({ data });

  const paths = data.map((id) => {
    return { params: { id } };
  });

  return { paths, fallback: false };
};
