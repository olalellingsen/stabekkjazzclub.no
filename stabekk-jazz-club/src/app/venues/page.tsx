"use client";
import React from "react";
import VenueInfo from "../components/VenueInfo";

function Venues() {
  return (
    <section>
      <h1 className="text-center">Våre lokaler</h1>
      <br />
      <VenueInfo
        name="Stabekk Kino"
        img1="/stabekk_kino.jpg"
        img2="/home.jpg"
        address="Gamle Ringeriksvei 5, 1369 Stabekk"
        mapsLink="https://maps.app.goo.gl/tmrtFT1mZoEmPU6HA"
        info="Kulturhuset Stabekk Kino er et samlingssted for kulturell aktivitet i Østre Bærum, og har fungert som et lokalt kulturhus siden kinoen ble lagt ned i 1997. Formålet er primært å gi rom for lokale kulturaktører, foreninger, organisasjoner, grupper og personer som kan bidra til at virksomheten preges av en klar filmprofil og stor variasjon i øvrige kulturelle aktiviteter."
      />

      <VenueInfo
        name="Papirfly Bar"
        img1="/papirfly1.jpg"
        img2="/papirfly2.jpg"
        address="Forneburingen 29, 1360 Fornebu"
        mapsLink="https://maps.app.goo.gl/NmJhiRseZboHL7fr9"
        info="Papirfly på gamle Fornebu flyplass serverer øl, vin og Cocktails i en herlig atmosfære. Vi har lerret for filmvisninger, stor uteservering og diverse spill på rolige dager. Barnevennlig og dyrevennlig."
      />

      <VenueInfo
        name="Varmesentralen"
        img1="/varmesentralen1.jpg"
        address="Forneburingen 41, 1360 Fornebu"
        mapsLink="https://maps.app.goo.gl/pwXakmMfJgAbGnXH6"
        info="Varmesentralen er en kulturarena på Flytårnet Fornebu. Varmesentralen starter opp i mai 2024 som et samarbeid mellom Bærum kommune og Flytårnet Fornebu AS."
      />
    </section>
  );
}

export default Venues;
