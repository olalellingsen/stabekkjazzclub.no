import Link from "next/link";
import Image from "next/image";
import HomeImg from "../../public/home.jpg";

export default function Home() {
  return (
    <>
      <Image
        src={HomeImg}
        alt="Stabekk Jazz Club"
        className="object-cover z-[-2]"
        fill
        placeholder="blur"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-[-1]" />

      <div className="absolute right-0 top-1/4 sm:top-1/3 w-full">
        <div
          className={`flex gap-2 flex-wrap justify-center text-white px-4 py-8 font-bold sm:text-4xl animate-fadeIn`}
        >
          <h1>Velkommen til</h1>
          <h1>Stabekk Jazz Club</h1>
        </div>
        <div className={`flex flex-wrap justify-center gap-4 animate-fadeIn`}>
          <Link href="/events">
            <button className="btn1">Se kommende konserter</button>
          </Link>
          <Link
            href="https://secure.officevisual.net/su/35481099518017"
            target="blank"
          >
            <button className="btn2">Motta vårt nyhetsbrev</button>
          </Link>
        </div>
      </div>
    </>
  );
}
