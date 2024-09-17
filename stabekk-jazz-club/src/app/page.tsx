import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-center">Velkommen til Stabekk Jazz Club</h1>
      <img src="" alt="" />
      <div className="flex justify-center gap-4">
        <Link href="/events">
          <button className="btn1">Se kommende konserter</button>
        </Link>
        <Link href="https://secure.officevisual.net/su/35481099518017">
          <button className="btn2">Registrer deg på vårt nyhetsbrev</button>
        </Link>
      </div>
    </div>
  );
}
